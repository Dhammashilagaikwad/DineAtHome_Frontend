import React, { useState } from 'react';
import '../Styles/DutyToggle.css';

const DutyToggle = () => {
  const [onDuty, setOnDuty] = useState(false);

  const toggleDuty = () => {
    setOnDuty(!onDuty);
  };

  return (
    <div className="side">
    <button
      onClick={toggleDuty}
      className={`duty-toggle ${onDuty ? 'on' : 'off'}`}
      aria-pressed={onDuty} // for accessibility
      >
      <div className="toggle-indicator"></div>
      <span className="status-text">{onDuty ? 'ON DUTY' : 'OFF DUTY'}</span>
    </button>
      </div>
  );
};

export default DutyToggle;

