import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import "../App.css";

const SignWorkOrder = ({ customerName, orderId }) => {
  const handleSign = () => {
    const serviceId = "your_service_id";
    const templateId = "your_confirmation_template_id";
    const userId = "your_user_id";

    const templateParams = {
      customer_name: customerName,
      order_id: orderId,
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (result) => {
        console.log("Signature confirmation sent!", result.status, result.text);
        alert("Thank you for signing the work order!");
      },
      (error) => {
        console.error("Error sending confirmation:", error);
      }
    );
  };

  return (
    <div>
      <h2>Work Order Signature</h2>
      <p>{customerName}, please sign the work order by clicking below.</p>
      <button onClick={handleSign}>Sign Work Order</button>
    </div>
  );
};

export default SignWorkOrder;
