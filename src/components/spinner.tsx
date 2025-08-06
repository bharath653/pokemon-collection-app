import React from 'react';

const Spinner:React.FC = () => {
  return (
    <div className="spinner-overlay">
        <p style={{color:'white'}}>Loading more Pokemon... </p>
      <div className="spinner" />
    </div>
   
  );
};

export default Spinner;