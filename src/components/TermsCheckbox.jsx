import React from 'react';

const TermsCheckbox = ({ isChecked, onCheckboxChange }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
        />
        I agree to the above Terms and Conditions
      </label>
    </div>
  );
};

export default TermsCheckbox;
