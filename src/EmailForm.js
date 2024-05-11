import React, { useState } from "react";
import axios from "axios";
import "./EmailForm.css"; // Import CSS file for styling

function EmailForm() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/send-email", emailData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="email-form">
      <div className="email-header">
        <span>Node-Mailer</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="To"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Subject"
          />
        </div>
        <div className="form-group">
          <textarea
            id="message"
            name="text"
            value={emailData.text}
            onChange={handleChange}
            required
            className="textarea-field"
            placeholder="Compose email..."
          ></textarea>
        </div>
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default EmailForm;
