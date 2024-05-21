from flask import Flask, jsonify, request, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import Beneficiary, User, Wallet, Transaction, WalletTransaction, db
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_migrate import Migrate
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Instapay.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key' 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400  # 30 minutes

CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.is_admin:
            return fn(*args, **kwargs)
        else:
            return jsonify({'message': 'Admin privileges required'}), 403
    return wrapper

profile_bp = Blueprint('profile', __name__)

# User registration and login routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone_number = data.get('phone_number')
    is_admin = data.get('is_admin', False)

    # Convert the is_admin value to a boolean
    if isinstance(is_admin, str):
        is_admin = is_admin.lower() == ['true', 'True']

    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400

    # Create a new user
    new_user = User(username=username, email=email, first_name=first_name, last_name=last_name, is_admin=is_admin)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter((User.username == username) ).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# User routes
@app.route('/api/users', methods=['GET'])  
@jwt_required()
def get_user_profile():  
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        data = {
            "name": user.username,
            "email": user.email,
            "id": user.id,
            # 'password': user.password,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'is_admin': user.is_admin
        }
        return jsonify(data)
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/api/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id == user_id:  
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            if 'first_name' in data and data['first_name']:
                user.first_name = data['first_name']
            if 'last_name' in data and data['last_name']:
                user.last_name = data['last_name']
            user.phone_number = data.get('phone_number', user.phone_number)
            db.session.commit()
            return jsonify({'message': 'Profile updated successfully'})
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Unauthorized'}), 401


# Beneficiary routes
@app.route('/api/beneficiaries', methods=['POST'])
@jwt_required()
def add_beneficiary():
    user_id = get_jwt_identity()
    data = request.get_json()
    account_number = data.get('account_number')

    # Check if the account_number already exists for the current user
    existing_beneficiary = Beneficiary.query.filter_by(account_number=account_number, user_id=user_id).first()
    if existing_beneficiary:
        return jsonify({'message': 'Account number already exists for this user'}), 400

    new_beneficiary = Beneficiary(
        user_id=user_id,
        name=data.get('name'),
        phone_number=data.get('phone_number'),
        account_number=account_number,
        bank_name=data.get('bank_name'),
        bank_branch_name=data.get('bank_branch_name'),
        id_number=data.get('id_number'),
        currency=data.get('currency'),
        email=data.get('email')
    )
    db.session.add(new_beneficiary)
    db.session.commit()
    return jsonify(new_beneficiary.to_dict()), 201

@app.route('/api/beneficiaries', methods=['GET'])
@jwt_required()
def get_beneficiaries():
    user_id = get_jwt_identity()
    if not User.query.get(user_id).is_admin:  # Check if the user is NOT an admin
        beneficiaries = Beneficiary.query.filter_by(user_id=user_id).all()  # Return only the user's beneficiaries
    else:
        beneficiaries = Beneficiary.query.all()  # For admin, return all beneficiaries
    return jsonify([beneficiary.to_dict() for beneficiary in beneficiaries])

@app.route('/api/beneficiaries/<int:beneficiary_id>', methods=['PUT'])
@jwt_required()
def update_beneficiary(beneficiary_id):
    user_id = get_jwt_identity()
    beneficiary = Beneficiary.query.filter_by(id=beneficiary_id, user_id=user_id).first()
    if beneficiary or User.query.get(user_id).is_admin: # Added condition to allow admin to update any beneficiary
        data = request.get_json()
        beneficiary.update_from_dict(data)
        db.session.commit()
        return jsonify({'message': 'Beneficiary updated successfully'})
    else:
        return jsonify({'message': 'Beneficiary not found or not authorized'}), 404


@app.route('/api/beneficiaries/<int:beneficiary_id>', methods=['DELETE'])
@jwt_required()
def delete_beneficiary(beneficiary_id):
    user_id = get_jwt_identity()
    beneficiary = Beneficiary.query.filter_by(id=beneficiary_id, user_id=user_id).first()
    if beneficiary or User.query.get(user_id).is_admin:
        db.session.delete(beneficiary)
        db.session.commit()
        return jsonify({'message': 'Beneficiary deleted successfully'})
    else:
        return jsonify({'message': 'Beneficiary not found or not authorized'}), 404


# Wallet routes
@app.route('/api/wallets', methods=['GET'])
@jwt_required()
def get_wallets():
    user_id = get_jwt_identity()
    if User.query.get(user_id).is_admin:
        wallets = Wallet.query.all()
    else:
        wallets = Wallet.query.filter_by(user_id=user_id).all()
    return jsonify([wallet.to_dict() for wallet in wallets])

@app.route('/api/wallets', methods=['POST'])
@jwt_required()
def add_wallet():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_wallet = Wallet(
        user_id=user_id,
        balance=data.get('balance'),
        currency=data.get('currency')
    )
    db.session.add(new_wallet)
    db.session.commit()
    return jsonify(new_wallet.to_dict()), 201

@app.route('/api/wallets/<int:wallet_id>', methods=['PUT'])
@jwt_required()
def update_wallet(wallet_id):
    user_id = get_jwt_identity()
    wallet = Wallet.query.filter_by(id=wallet_id, user_id=user_id).first()
    if wallet or User.query.get(user_id).is_admin:
        data = request.get_json()
        wallet.update_from_dict(data)
        db.session.commit()
        return jsonify({'message': 'Wallet updated successfully'})
    else:
        return jsonify({'message': 'Wallet not found or not authorized'}), 404

@app.route('/api/wallets/<int:wallet_id>', methods=['DELETE'])
@jwt_required()
def delete_wallet(wallet_id):
    user_id = get_jwt_identity()
    wallet = Wallet.query.filter_by(id=wallet_id, user_id=user_id).first()
    if wallet or User.query.get(user_id).is_admin:
        db.session.delete(wallet)
        db.session.commit()
        return jsonify({'message': 'Wallet deleted successfully'})
    else:
        return jsonify({'message': 'Wallet not found or not authorized'}), 404

# Transaction routes
@app.route('/api/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    recipient_account_number = data.get('recipient')
    amount = data.get('amount')

    if not recipient_account_number or not amount:
        return jsonify({'message': 'Recipient account number and amount are required'}), 400

    sender_wallet = Wallet.query.filter_by(user_id=user_id).first()
    if not sender_wallet or sender_wallet.balance < amount:
        return jsonify({'message': 'Insufficient funds'}), 400

    recipient_beneficiary = Beneficiary.query.filter_by(account_number=recipient_account_number).first()
    if not recipient_beneficiary:
        return jsonify({'message': 'Recipient account number not found'}), 404

    recipient_wallet = Wallet.query.filter_by(user_id=recipient_beneficiary.user_id).first()
    if not recipient_wallet:
        return jsonify({'message': 'Recipient wallet not found'}), 404

    sender_wallet.balance -= amount
    recipient_wallet.balance += amount

    transaction = Transaction(
        sender_id=user_id,
        recipient_account_number=recipient_account_number,
        amount=amount
    )
    db.session.add(transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction successful'}), 200
    
@app.route('/api/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    if User.query.get(user_id).is_admin:
        transactions = Transaction.query.all()
    else:
        transactions = Transaction.query.join(WalletTransaction).filter(WalletTransaction.wallet.has(user_id=user_id)).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@app.route('/api/transactions', methods=['POST'])
@jwt_required()
def add_transaction():
    data = request.get_json()
    new_transaction = Transaction(
        timestamp=data.get('timestamp'),
        status=data.get('status'),
        transaction_type=data.get('transaction_type')
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction.to_dict()), 201

@app.route('/api/transactions/<int:transaction_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        data = request.get_json()
        transaction.update_from_dict(data)
        db.session.commit()
        return jsonify({'message': 'Transaction updated successfully'})
    else:
        return jsonify({'message': 'Transaction not found'}), 404

@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({'message': 'Transaction deleted successfully'})
    else:
        return jsonify({'message': 'Transaction not found'}), 404

# WalletTransaction routes
@app.route('/api/wallet-transactions', methods=['GET'])
@jwt_required()
def get_wallet_transactions():
    user_id = get_jwt_identity()
    wallet_transactions = WalletTransaction.query.join(Wallet).filter(Wallet.user_id == user_id).all()
    return jsonify([wallet_transaction.to_dict() for wallet_transaction in wallet_transactions])

@app.route('/api/wallet-transactions', methods=['POST'])
@jwt_required()
def add_wallet_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    wallet_id = data.get('wallet_id')
    transaction_id = data.get('transaction_id')
    amount = data.get('amount'),
    is_sender = data.get('is_sender')

       # Check if amount is wrapped in a tuple and extract the value if necessary
    if isinstance(amount, tuple):
        amount = amount[0]

    # Convert the is_sender value to a boolean
    if isinstance(is_sender, str):
        is_sender = is_sender.lower() == ['true', 'True']

    wallet = Wallet.query.filter_by(id=wallet_id, user_id=user_id).first()
    transaction = Transaction.query.get(transaction_id)

    if wallet and transaction:
        new_wallet_transaction = WalletTransaction(
            wallet=wallet,
            transaction=transaction,
            amount=amount,
            is_sender=is_sender
        )
        db.session.add(new_wallet_transaction)
        db.session.commit()
        return jsonify(new_wallet_transaction.to_dict()), 201
    else:
        return jsonify({'message': 'Invalid wallet or transaction'}), 400

if __name__ == "__main__":
    app.run(debug=True)    
