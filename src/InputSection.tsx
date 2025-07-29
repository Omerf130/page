import React, { useState } from "react";
import "./InputSection.css";
const InputSection: React.FC = () => {
  const [fields, setFields] = useState(
    Array.from({ length: 19 }, () => "")
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedFields = [...fields];

    updatedFields[index] = e.target.value;

    setFields(updatedFields);
  };
  const labels = [
    "בניין",
    "תאריך",
    "מפקח",
    "לובי",
    "קומות",
    "מעליות",
    "דלתות כניסה כולל משקופים",
    "חדר מדרגות",

    "מחסנים",
    "רחבת כניסה",
    "חניות",
    "גופי תאורה",
    "מפסקים",
    "משאבות",
    "מאגר מים",
    "גנרטור",
    "דלתות אש",

    "אינטרקום",
    "קודנים",
  ];

  const handleSubmit = () => {
    const message = labels
      .map((label, index) => `${label}: ${fields[index]}`)
      .join("\n");
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+972544993155";
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };
  return (
    <div className="input-section">
      <div className="input-group">
        {labels.slice(0, 3).map((label, index) => (
          <div key={index}>
            <label>{label}</label>
            <input
              type="text"
              value={fields[index]}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
      </div>

      <h3 className="headline">ביקורת ניקיון</h3>

      <div className="input-group">
        {labels.slice(3).map((label, index) => (
          <div key={index + 3}>
            <label>{label}</label>

            <input
              type="text"
              value={fields[index + 3]}
              onChange={(e) => handleChange(e, index + 3)}
            />
          </div>
        ))}

        <textarea placeholder="הערות"></textarea>
      </div>

      <button className="btn" onClick={handleSubmit}>
        שלח לוואטסאפ
      </button>
    </div>
  );
};

export default InputSection;
