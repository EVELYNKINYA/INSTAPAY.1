import React, { useState, useEffect } from 'react';

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    email: '',
    account_number: '',
  });

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/beneficiaries');
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBeneficiary({ ...newBeneficiary, [e.target.name]: e.target.value });
  };

  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBeneficiary),
      });
      const data = await response.json();
      setBeneficiaries([...beneficiaries, data]);
      setNewBeneficiary({ name: '', email: '', account_number: '' });
    } catch (error) {
      console.error('Error adding beneficiary:', error);
      // Display an error message or handle the error appropriately
    }
  };

  return (
    <div className="beneficiaries-container">
      <h2>Beneficiaries</h2>
      <div className="form-container">
        <form onSubmit={handleAddBeneficiary}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newBeneficiary.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newBeneficiary.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="account_number">Account Number:</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={newBeneficiary.account_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Beneficiary</button>
        </form>
      </div>
      <div className="message-container">
        {beneficiaries.length === 0 ? (
          <p>No beneficiaries added yet.</p>
        ) : (
          <div>
            <h3>List of Beneficiaries</h3>
            <ul className="beneficiary-list">
              {beneficiaries.map((beneficiary) => (
                <li key={beneficiary.id} className="beneficiary-item">
                  <div className="beneficiary-details">
                    <div>
                      <strong>Name:</strong> {beneficiary.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {beneficiary.email}
                    </div>
                    <div>
                      <strong>Account Number:</strong> {beneficiary.account_number}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beneficiaries;