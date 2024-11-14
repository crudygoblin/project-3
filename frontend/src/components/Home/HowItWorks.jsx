import React from 'react';
import chartImage from './Screenshot 2024-11-05 at 9.19.00 PM.png'; // Adjust path if necessary

const ITJobTrendsChart = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img 
          src={chartImage} 
          alt="IT Job Trends Chart" 
          style={{ width: 'auto', height: '500px',marginBottom: '30px' }} // Bottom margin
        />
      </div>
      <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}> {/* Top margin */}
      "The demand for IT job openings has surged dramatically due to rapid digital transformation and increased reliance on technology across all sectors, with particularly high opportunities in Cloud Computing, Cybersecurity, Data Analysis, and Artificial Intelligence."
      </p>
    </>
  );
};

export default ITJobTrendsChart;
