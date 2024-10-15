import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../App.css";

const WorkOrderPDF = () => {
  const generatePDF = () => {
    const input = document.getElementById("work-order");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size page
      pdf.save("work_order.pdf");
    });
  };

  return (
    <div>
      <div
        id="work-order"
        style={{ padding: "20px", background: "white", width: "800px" }}
      >
        <h2>Maintenance Work Order - RoadRescue Connect</h2>
        <p>
          <strong>Company Name:</strong> RoadRescue Connect
        </p>
        <p>
          <strong>Client Name:</strong> John Doe
        </p>
        <p>
          <strong>Order Date:</strong> 01/09/2024
        </p>
        {/* Add the rest of the form fields like in the image */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Labor Description</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>General Maintenance</td>
              <td>2.25</td>
              <td>$32.00</td>
              <td>$72.00</td>
            </tr>
            <tr>
              <td>Special Service</td>
              <td>11.00</td>
              <td>$40.00</td>
              <td>$440.00</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Total:</strong> $512.00
        </p>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default WorkOrderPDF;
