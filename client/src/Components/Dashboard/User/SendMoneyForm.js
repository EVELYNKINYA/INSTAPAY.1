import React, { useState } from 'react';

const SendMoney = ({ beneficiaries }) => {
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

    try {
      const response = await fetch('http://127.0.0.1:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: selectedBeneficiaryData.account_number,
          amount: parseFloat(amount),
        }),
      });

      if (response.ok) {
        console.log('Money sent successfully');
        setAmount('');
        setSelectedBeneficiary(null);
      } else {
        console.error('Failed to send money');
      }
    } catch (error) {
      console.error('Error sending money:', error);
    }
  };

  return (
    <div className="send-money-container">
      <h2>Send Money</h2>
      <form onSubmit={handleSendMoney}>
        <div>
          <label htmlFor="beneficiary">Beneficiary:</label>
          <select
            id="beneficiary"
            value={selectedBeneficiary || ''}
            onChange={handleBeneficiaryChange}
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
          />
        </div>
        <button type="submit">Send Money</button>
      </form>
    </div>
  );
};

export default SendMoney;