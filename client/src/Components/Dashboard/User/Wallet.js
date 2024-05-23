import React, { useState, useEffect } from 'react';

const Wallet = () => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [beneficiaries, setBeneficiaries] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/beneficiaries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBeneficiaries(data);
                } else {
                    console.error('Failed to fetch beneficiaries');
                }
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
            }
        };

        fetchBeneficiaries();
    }, [token]);

    const initiatePayment = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch('http://127.0.0.1:5000/initiate_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, amount }),
            });
            

            if (response.ok) {
                const data = await response.json();
                console.log('Payment initiated:', data);
                const newBalance = walletBalance + parseFloat(amount);
                setWalletBalance(newBalance);
            } else {
                const errorData = await response.json();
                console.error('Error initiating payment:', errorData);
                setError('Error initiating payment');
            }
        } catch (error) {
            setError('Error initiating payment');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        initiatePayment();
    };

    const handleSendMoney = async (recipientAccountNumber, transferAmount) => {
        if (transferAmount > walletBalance) {
            setError('Insufficient balance');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipient: recipientAccountNumber,
                    amount: parseFloat(transferAmount),
                }),
            });

            if (response.ok) {
                console.log('Money sent successfully');
                setWalletBalance(walletBalance - parseFloat(transferAmount));
            } else {
                const errorData = await response.json();
                console.error('Failed to send money:', errorData);
                setError('Failed to send money');
            }
        } catch (error) {
            console.error('Error sending money:', error);
            setError('Error sending money');
        }
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.walletContainer}>
                <h2 style={styles.header}>Hello 👋🏽, Welcome to Your Wallet!</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor="phone" style={styles.label}>Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        style={styles.input}
                        required
                    />
                    <label htmlFor="amount" style={styles.label}>Amount</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        style={styles.input}
                        required
                    />
                    <button type="submit" disabled={loading} style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}>
                        {loading ? 'Initiating Payment...' : 'Deposit'}
                    </button>
                </form>
                <p style={styles.balance}>Wallet Balance: {walletBalance.toFixed(2)}</p>
                <SendMoney beneficiaries={beneficiaries} onSendMoney={handleSendMoney} />
            </div>
        </div>
    );
};

const SendMoney = ({ beneficiaries, onSendMoney }) => {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [amount, setAmount] = useState('');

    const handleBeneficiaryChange = (e) => {
        setSelectedBeneficiary(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();

        if (!selectedBeneficiary || !amount) {
            return;
        }

        const selectedBeneficiaryData = beneficiaries.find(
            (beneficiary) => beneficiary.id === parseInt(selectedBeneficiary)
        );

        onSendMoney(selectedBeneficiaryData.account_number, amount);
        setAmount('');
        setSelectedBeneficiary(null);
    };

    return (
        <div style={styles.sendMoneyContainer}>
            <h2>Send Money</h2>
            <form onSubmit={handleSendMoney}>
                <div>
                    <label htmlFor="beneficiary">Beneficiary:</label>
                    <select
                        id="beneficiary"
                        value={selectedBeneficiary || ''}
                        onChange={handleBeneficiaryChange}
                        style={styles.select}
                    >
                        <option value="">Select a beneficiary</option>
                        {beneficiaries.map((beneficiary) => (
                            <option key={beneficiary.id} value={beneficiary.id}>
                                {beneficiary.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        min="0"
                        step="0.01"
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Send Money</button>
            </form>
        </div>
    );
};

const styles = {
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '0px',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif'
    },
    walletContainer: {
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '300px',
        width: '100%',
        textAlign: 'center',
         
    },
    header: {
        color: '#333',
        marginBottom: '20px'
    },
    error: {
        color: 'red',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1px'
    },
    label: {
        textAlign: 'left',
        color: '#555'
    },
    // input: {
    //     padding: '10px',
    //     border: '1px solid #ddd',
    //     borderRadius: '4px'
    // },
    select: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%'
    },
    button: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    buttonDisabled: {
        backgroundColor: '#6c757d'
    },
    balance: {
        marginTop: '20px',
        color: '#333'
    },
    sendMoneyContainer: {
        marginTop: '30px',
        textAlign: 'center'
    }
};

export default Wallet;
