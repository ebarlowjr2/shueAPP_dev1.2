import React, { useState } from 'react';

function CertificationForm({ onAddCertification }) {
  const [certName, setCertName] = useState('');
  const [dateEarned, setDateEarned] = useState('');
  const [requiredHrs, setRequiredHrs] = useState('');
  const [earnedHrs, setEarnedHrs] = useState('');

  const handleSubmit = () => {
    onAddCertification({ certName, dateEarned, requiredHrs, earnedHrs });
    // Clear the form fields after submission
    setCertName('');
    setDateEarned('');
    setRequiredHrs('');
    setEarnedHrs('');
  };

  return (
    <div id="certifications-form">
      <label>Certification Name:</label>
      <input type="text" value={certName} onChange={(e) => setCertName(e.target.value)} placeholder="Enter certification name" />

      <label>Date Earned:</label>
      <input type="date" value={dateEarned} onChange={(e) => setDateEarned(e.target.value)} />

      <label>Required HRS:</label>
      <input type="number" value={requiredHrs} onChange={(e) => setRequiredHrs(e.target.value)} placeholder="Enter required CEUs" />

      <label>Earned HRS:</label>
      <input type="number" value={earnedHrs} onChange={(e) => setEarnedHrs(e.target.value)} placeholder="Enter earned CEUs" />

      <button onClick={handleSubmit}>Add Certification</button>
    </div>
  );
}

export default CertificationForm;
