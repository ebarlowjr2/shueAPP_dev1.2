import './css/styles.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CertificationForm from './components/CertificationForm';
import CertificationTable from './components/CertificationTable';
import SeekCEUs from './components/SeekCEUs';

function App() {
  const [certifications, setCertifications] = useState([]); // Initialize as an empty array

  const addCertification = (certification) => {
    setCertifications([...certifications, certification]);
  };

  return (
    <Router>
      <div className="admin-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <CertificationForm onAddCertification={addCertification} />
                <CertificationTable certifications={certifications} /> {/* Pass certifications as a prop */}
              </>
            } />
            <Route path="/seek-ceus" element={<SeekCEUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
