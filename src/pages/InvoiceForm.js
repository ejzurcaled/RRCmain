// import React, { useState, useEffect, useRef } from "react";
// import { LoadScript, Autocomplete } from "@react-google-maps/api";
// import InvoiceItem from "../components/InvoiceItem.js";
// import "../App.css";
// import DarkMode from "../components/DarkMode.js";

// const InvoiceForm = () => {
//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipcode: "",
//   });
//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [date, setDate] = useState("");
//   const [items, setItems] = useState([
//     { name: "", description: "", quantity: 1, unitPrice: 0 },
//   ]);
//   const [taxRate, setTaxRate] = useState(10);
//   const billingAddressRef = useRef(null);

//   useEffect(() => {
//     const currentDate = new Date().toISOString().split("T")[0];
//     setDate(currentDate);
//   }, []);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (window.google && window.google.maps) {
//         const autocomplete = new window.google.maps.places.Autocomplete(
//           billingAddressRef.current,
//           { types: ["address"] }
//         );

//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace();
//           if (place && place.address_components) {
//             const { streetAddress, city, state, zipcode } =
//               extractAddressComponents(place.address_components);
//             setCustomer((prev) => ({
//               ...prev,
//               address: streetAddress, // Set only the street address
//               city,
//               state,
//               zipcode,
//             }));
//           }
//         });

//         clearInterval(intervalId);
//       }
//     }, 100);

//     return () => clearInterval(intervalId);
//   }, []);

//   // Function to extract street address, city, state, and zip code from the address components
//   const extractAddressComponents = (components) => {
//     const address = { streetAddress: "", city: "", state: "", zipcode: "" };

//     components.forEach((component) => {
//       const types = component.types;
//       if (types.includes("street_number")) {
//         address.streetAddress = component.long_name; // Start with street number
//       } else if (types.includes("route")) {
//         address.streetAddress += " " + component.long_name; // Add the street name
//       } else if (types.includes("locality")) {
//         address.city = component.long_name;
//       } else if (types.includes("administrative_area_level_1")) {
//         address.state = component.short_name;
//       } else if (types.includes("postal_code")) {
//         address.zipcode = component.long_name;
//       }
//     });

//     return address;
//   };

//   const handleCustomerChange = (e) => {
//     setCustomer({ ...customer, [e.target.name]: e.target.value });
//   };

//   const handleItemChange = (index, e) => {
//     const newItems = [...items];
//     newItems[index][e.target.name] = e.target.value;
//     setItems(newItems);
//   };

//   const addItem = () => {
//     setItems([
//       ...items,
//       { name: "", description: "", quantity: 1, unitPrice: 0 },
//     ]);
//   };

//   const removeItem = (index) => {
//     const newItems = items.filter((_, itemIndex) => itemIndex !== index);
//     setItems(newItems);
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => {
//       const amount = item.quantity * item.unitPrice;
//       return total + amount + (amount * taxRate) / 100;
//     }, 0);
//   };

//   const [isActive, setIsActive] = useState(false);
//   const toggleDropdown = () => {
//     setIsActive(!isActive);
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyAg2G67Vhp0rV-_kJkTen8SzO3oC-Nvbkk"
//       libraries={["places"]}
//     >
//       <div className="rrc-container rrc-wide">
//         <header className="header" id="header">
//           <DarkMode />
//           <span className="nav_logo-name">Dashboard</span>
//           <div>
//             <img
//               src="/rrc/rrc-logo.png"
//               alt="Logo"
//               className="logo"
//               id="logo"
//             />
//           </div>
//         </header>
//         <div className="l-navbar" id="nav-bar">
//           <span className="bx bx-menu header_toggle" id="header_toggle"></span>
//           <nav className="nav">{/* Your navigation elements */}</nav>
//         </div>
//         <h1 className="rrc-heading">Invoice Maker - RoadRescue Connect</h1>

//         <label htmlFor="customerName">Customer Name</label>
//         <input
//           id="customerName"
//           type="text"
//           name="name"
//           value={customer.name}
//           onChange={handleCustomerChange}
//           className="rrc-input"
//         />

//         <label htmlFor="phoneNumber">Phone Number</label>
//         <input
//           id="phoneNumber"
//           type="text"
//           name="phone"
//           value={customer.phone}
//           onChange={handleCustomerChange}
//           className="rrc-input"
//         />

//         <label htmlFor="billingAddress">Billing Address</label>
//         <Autocomplete>
//           <div className="autocomplete-dropdown">
//             <input
//               ref={billingAddressRef}
//               id="billingAddress"
//               type="text"
//               name="address"
//               value={customer.address}
//               onChange={handleCustomerChange}
//               className="rrc-input"
//               placeholder="Enter your address"
//             />
//           </div>
//         </Autocomplete>

//         <label htmlFor="city">City</label>
//         <input
//           id="city"
//           type="text"
//           name="city"
//           value={customer.city}
//           onChange={handleCustomerChange}
//           className="rrc-input"
//         />

//         <label htmlFor="state">State</label>
//         <input
//           id="state"
//           type="text"
//           name="state"
//           value={customer.state}
//           onChange={handleCustomerChange}
//           className="rrc-input"
//         />

//         <label htmlFor="zipcode">Zip Code</label>
//         <input
//           id="zipcode"
//           type="text"
//           name="zipcode"
//           value={customer.zipcode}
//           onChange={handleCustomerChange}
//           className="rrc-input"
//         />

//         <label htmlFor="invoiceNumber">Invoice Number</label>
//         <input
//           id="invoiceNumber"
//           type="text"
//           value={invoiceNumber}
//           onChange={(e) => setInvoiceNumber(e.target.value)}
//           className="rrc-input"
//         />

//         <label htmlFor="invoiceDate">Invoice Date</label>
//         <input
//           id="invoiceDate"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="rrc-input"
//         />

//         <label htmlFor="taxRate">Tax Rate (%)</label>
//         <input
//           id="taxRate"
//           type="number"
//           value={taxRate}
//           onChange={(e) => setTaxRate(e.target.value)}
//           className="rrc-input"
//         />

//         <h2 className="rrc-subheading">Items</h2>
//         <div className="rrc-invoice-items">
//           {items.map((item, index) => (
//             <div key={index} className="rrc-item-row-container">
//               <InvoiceItem
//                 index={index}
//                 item={item}
//                 onItemChange={handleItemChange}
//               />
//               {items.length > 1 && (
//                 <button
//                   className="rrc-remove-x"
//                   onClick={() => removeItem(index)}
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <button onClick={addItem} className="rrc-button">
//           Add Item
//         </button>

//         <h3 className="rrc-total">Total: ${calculateTotal().toFixed(2)}</h3>

//         <button
//           className="rrc-button"
//           onClick={() => alert("Print Functionality")}
//         >
//           Print
//         </button>
//       </div>
//     </LoadScript>
//   );
// };

// export default InvoiceForm;
