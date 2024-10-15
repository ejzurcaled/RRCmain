import React from "react";
import "../App.css";

const InvoiceItem = ({ index, item, onItemChange }) => {
  return (
    <div className="rrc-item-row">
      <label htmlFor={`itemName-${index}`}>Item Name</label>
      <input
        id={`itemName-${index}`}
        type="text"
        name="name"
        value={item.name}
        onChange={(e) => onItemChange(index, e)}
        className="rrc-input"
      />
      <label htmlFor={`itemDescription-${index}`}>Description</label>
      <textarea
        id={`itemDescription-${index}`}
        name="description"
        value={item.description}
        onChange={(e) => onItemChange(index, e)}
        className="rrc-textarea"
        rows="3" // You can adjust the number of visible rows
      ></textarea>

      <label htmlFor={`itemQuantity-${index}`}>Quantity</label>
      <input
        id={`itemQuantity-${index}`}
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={(e) => onItemChange(index, e)}
        className="rrc-input"
      />
      <label htmlFor={`itemUnitPrice-${index}`}>Unit Price</label>
      <input
        id={`itemUnitPrice-${index}`}
        type="number"
        name="unitPrice"
        value={item.unitPrice}
        onChange={(e) => onItemChange(index, e)}
        className="rrc-input"
      />
    </div>
  );
};

export default InvoiceItem;
