import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../App.css";

const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    workDescription: "",
    workPrice: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // You will need to replace these IDs with your EmailJS service ID, template ID, and user ID
    const serviceId = "service_2gjjcr9";
    const templateId = "template_0k2di8g";
    const userId = "L_R2M4jV9n12UDpID";

    const templateParams = {
      customer_name: formData.customerName,
      customer_email: formData.customerEmail,
      work_description: formData.workDescription,
      work_price: formData.workPrice,
      confirm_link: "https://your-signing-url.com", // URL where customer can 'sign'
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (result) => {
        console.log("Email successfully sent!", result.status, result.text);
      },
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  };

  return (
    <div>
      <h2>Send Work Order to Customer</h2>
      <form onSubmit={sendEmail}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Work Description:</label>
          <textarea
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="workPrice"
            value={formData.workPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Work Order</button>
      </form>
    </div>
  );
};

export default WorkOrderForm;
