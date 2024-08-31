import React from 'react';

function CertificationTable({ certifications }) {
  // Add a check to ensure certifications is an array
  if (!certifications || certifications.length === 0) {
    return <p>No certifications added yet.</p>;
  }

  return (
    <div id="certifications-container">
      <h2>Certifications</h2>
      <table id="certifications-table">
        <thead>
          <tr>
            <th>Certification</th>
            <th>Date Earned</th>
            <th>Required HRS</th>
            <th>Earned HRS</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert, index) => (
            <tr key={index}>
              <td>{cert.certName}</td>
              <td>{cert.dateEarned}</td>
              <td>{cert.requiredHrs}</td>
              <td>{cert.earnedHrs}</td>
              <td><span className="edit-icon">✏️</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificationTable;
