import React, { useState } from "react";
import "./InputSection.css";

const InputSection: React.FC = () => {
  const [fields, setFields] = useState(Array.from({ length: 19 }, () => ""));
  const [notes, setNotes] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = e.target.value;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    const phoneNumber = "+972549132875";

    // Construct message parts
    const fieldLines = labels.map(
      (label, index) => `${label}: ${fields[index]}`
    );

    const notesLine = notes.trim() ? `\n\nהערות:\n${notes.trim()}` : "";

    // Combine all parts
    let fullMessage = [...fieldLines, notesLine].join("\n");

    // Trim if too long (max safe WhatsApp limit)
    if (fullMessage.length > 2000) {
      fullMessage = fullMessage.slice(0, 1990) + "...\n[הודעה נחתכה]";
    }

    const encodedMessage = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="input-section">
      <div className="logo">
        <p>i.f mivnim</p>
      </div>
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
            <select
              value={fields[index + 3]}
              onChange={(e) => handleChange(e, index + 3)}
            >
              <option value="">בחר</option>
              <option value="תקין">תקין</option>
              <option value="לא תקין">לא תקין</option>
            </select>
          </div>
        ))}

        <label>הערות</label>
        <textarea
          placeholder="הערות"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <button className="btn" onClick={handleSubmit}>
        שלח לוואטסאפ
      </button>
    </div>
  );
};

export default InputSection;
