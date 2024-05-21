from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Boolean, Column, Enum, Float, ForeignKey, Integer, String
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True) 
    is_admin = db.Column(db.Boolean, default=False)
    wallets = db.relationship('Wallet', lazy='dynamic')
    beneficiaries = db.relationship('Beneficiary', back_populates='beneficiary_user', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'is_admin': self.is_admin
        }

class Wallet(db.Model):
    __tablename__ = 'wallet'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    balance = Column(Float, nullable=False)
    currency = Column(String, nullable=False)
    user = relationship('User', back_populates='wallets')
    wallet_transactions = relationship('WalletTransaction', back_populates='wallet')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'balance': self.balance,
            'currency': self.currency,
        }
    
    def update_from_dict(self, data):
        self.user_id = data.get('user_id', self.user_id)
        self.balance = data.get('balance', self.balance)
        self.currency = data.get('currency', self.currency)

class Transaction(db.Model):
    __tablename__ = 'transaction'

    id = Column(Integer, primary_key=True)
    timestamp = Column(Float, nullable=False)
    status = Column(Enum('pending', 'completed', 'failed'), nullable=False)
    transaction_type = Column(Enum('send', 'receive', 'deposit'), nullable=False)
    wallet_transactions = relationship('WalletTransaction', back_populates='transaction')

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'status': self.status,
            'transaction_type': self.transaction_type
        }

class WalletTransaction(db.Model):
    __tablename__ = 'wallet_transaction'

    id = Column(Integer, primary_key=True)
    wallet_id = Column(Integer, ForeignKey('wallet.id'), nullable=False)
    transaction_id = Column(Integer, ForeignKey('transaction.id'), nullable=False)
    amount = Column(Float, nullable=False)
    is_sender = Column(Boolean, nullable=False)
    wallet = relationship('Wallet', back_populates='wallet_transactions')
    transaction = relationship('Transaction', back_populates='wallet_transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'wallet_id': self.wallet_id,
            'transaction_id': self.transaction_id,
            'amount': self.amount,
            'is_sender': self.is_sender,
        }

class Beneficiary(db.Model):
    __tablename__ = 'beneficiaries'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(100), nullable=False)
    phone_number = Column(String(20), nullable=True)  
    account_number = Column(String(20), nullable=False, unique=True)
    bank_name = Column(String(100), nullable=False)  
    bank_branch_name = Column(String(100), nullable=False)  
    id_number = Column(String(20), nullable=False)  
    currency = Column(String(10), nullable=False)  
    email = Column(String(120), nullable=False, unique=True)
    beneficiary_user = relationship('User')

    def __repr__(self):
        return f'<Beneficiary {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'account_number': self.account_number,
            'bank_name': self.bank_name,
            'bank_branch_name': self.bank_branch_name,
            'id_number': self.id_number,
            'currency': self.currency,
            'email': self.email
        }
    
    def update_from_dict(self, data):
        self.name = data.get('name', self.name)
        self.phone_number = data.get('phone_number', self.phone_number)
        self.account_number = data.get('account_number', self.account_number)
        self.bank_name = data.get('bank_name', self.bank_name)
        self.bank_branch_name = data.get('bank_branch_name', self.bank_branch_name)
        self.id_number = data.get('id_number', self.id_number)
        self.currency = data.get('currency', self.currency)
        self.email = data.get('email', self.email)