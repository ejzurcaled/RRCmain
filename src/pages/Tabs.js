import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import jsPDF from "jspdf";
import "../App.css";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api"; // Import Autocomplete
import InvoiceItem from "../components/InvoiceItem.js";
import Header from "../components/header.js"; // Import Header component
import Navbar from "../components/nav.js"; // Import Navbar component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For using FontAwesome icons
import {
  faUser,
  faMoneyBill,
  faMapMarkerAlt,
  faTools,
  faFileAlt,
  faHistory,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import DarkMode from "../components/DarkMode.js";

// Tab component
const Tab = ({ label, icon, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-button ${isActive ? "active" : ""}`}
    >
      <FontAwesomeIcon icon={icon} className="tab-icon" /> {label}
    </button>
  );
};

// Tabs component
const Tabs = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const chartRef = useRef(null); // Ref to store chart instance
  const [chartData, setChartData] = useState({ labels: [], values: [] }); // Store chart data

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove the auth token
    navigate("/rrc/SignIn"); // Redirect to sign-in page
  };

  useEffect(() => {
    // Function to fetch data from API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://roadrescueconnect.com/rrc/fetch_leads.php"
        ); // Updated URL
        const data = await response.json();

        // Process data for Chart.js
        const labels = data.map((item) => item.status); // Assuming 'status' is a key in your data
        const values = data.map((item) => item.count); // Assuming 'count' is a key in your data

        // Define colors based on label
        const colors = labels.map((label) => {
          switch (label) {
            case "Approved":
              return "rgba(255, 165, 0, 0.5)"; // Orange for 'approved'
            case "Deleted":
              return "rgba(255, 0, 0, 0.5)"; // Red for 'deleted'
            case "In-Progress":
              return "rgba(255, 255, 0, 0.5)"; // Yellow for 'in-progress'
            case "New":
              return "rgba(0, 128, 0, 0.5)"; // Green for 'new'
            case "Pending":
              return "rgba(0, 0, 255, 0.5)"; // Blue for 'pending'
            case "Scheduled":
              return "rgba(128, 0, 128, 0.5)"; // Purple for 'scheduled'
            default:
              return "rgba(128, 128, 128, 0.5)"; // Default gray color for any other label
          }
        });

        // Create chart
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Lead Status",
                data: values,
                backgroundColor: colors,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Set font color to white
                },
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "end",
                formatter: function (value) {
                  return value; // Display the value (count) on each bar
                },
              },
            },
          },
        });
        setChartData({ labels, values }); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function to fetch data and create chart
    fetchData();
  }, []);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [activeTab, setactiveTab] = useState(0);

  // Independent state for each input field in Account Info tab
  const [accountInfo, setAccountInfo] = useState({
    customerName: "",
    accountNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    ext: "",
    email: "",
    otherFirstName: "",
    otherLastName: "",
    otherPhoneNumber: "",
    otherExt: "",
    otherEmail: "",
  });
  // Independent state for each input field in ServiceLocation tab
  const [ServiceLocation, setServiceLocation] = useState({
    LocationName: "",
    Address: "",
    City: "",
    State: "",
    Zipcode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleInputChangeServiceLoc = (e) => {
    const { name, value } = e.target;
    setServiceLocation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(10);
  const billingAddressRef = useRef(null); // Ref for the billing address input

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps && billingAddressRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        billingAddressRef.current,
        { types: ["address"] }
      );

      const handlePlaceChanged = () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          const { streetAddress, city, state, zipcode } =
            extractAddressComponents(place.address_components);

          setCustomer((prev) => ({
            ...prev,
            address: streetAddress,
            city,
            state,
            zipcode,
          }));

          billingAddressRef.current.value = streetAddress;
        }
      };

      autocomplete.addListener("place_changed", handlePlaceChanged);

      return () => {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      };
    }
  }, [billingAddressRef.current]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (window.google) {
      handleLoad();
    }

    return () => {
      // Any cleanup if necessary
    };
  }, []);

  // Function to extract street address, city, state, and zip code from the address components
  const extractAddressComponents = (components) => {
    const address = { streetAddress: "", city: "", state: "", zipcode: "" };

    components.forEach((component) => {
      const types = component.types;
      if (types.includes("street_number")) {
        address.streetAddress = component.long_name; // Start with street number
      } else if (types.includes("route")) {
        address.streetAddress += " " + component.long_name; // Add the street name
      } else if (types.includes("locality")) {
        address.city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        address.state = component.short_name;
      } else if (types.includes("postal_code")) {
        address.zipcode = component.long_name;
      }
    });

    return address;
  };

  const saveToFile = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // A4 page height (297mm for portrait)

    const logoBase64 = ""; // Add your logo's base64 string here

    // Function to render the upper section (header, company info, customer details, etc.)
    const renderTopSection = () => {
      // Add a blue header line at the top
      doc.setFillColor(127, 128, 128); // Blue color
      doc.rect(0, 0, 210, 20, "F"); // Full width of the document

      // Add logo to the blue header
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 10, 0, 50, 20); // Adjust position (10,2) and size (30,16) as needed
      }
      doc.setFontSize(18);
      doc.setTextColor(0, 112, 192); // Black color for company info
      doc.text("INVOICE", 180, 15); // Adjusted to make space for the logo

      // Company Information
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color for company info
      doc.text("RoadRescue Connect", 10, 28); // Adjusted to make space for the logo
      doc.text("4490 Oak Drive", 10, 33);
      doc.text("Albany, NY 12210", 10, 38);

      // Customer and Invoice Information
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Bill To Section
      doc.text("BILL TO:", 10, 60);
      doc.text(customer.name, 10, 66);
      doc.text(`${customer.address}`, 10, 72);
      doc.text(
        `${customer.city}, ${customer.state} ${customer.zipcode}`,
        10,
        78
      );

      // Ship To Section
      doc.text("SHIP TO:", 70, 60);
      doc.text(customer.name, 70, 66);
      doc.text(`${customer.address}`, 70, 72);
      doc.text(
        `${customer.city}, ${customer.state} ${customer.zipcode}`,
        70,
        78
      );

      // Invoice details
      doc.text("Invoice #:", 140, 60);
      doc.text(invoiceNumber, 140, 66);
      doc.text("Invoice Date", 140, 72);
      doc.text(date, 140, 78);
      doc.text("P.O.#:", 140, 84);
      doc.text("", 140, 90); // Placeholder for Purchase Order Number

      // Table Header
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Darker black color for table header
      doc.text("QTY", 10, 100);
      doc.text("ITEM NAME", 40, 100); // Changed from DESCRIPTION to ITEM NAME
      doc.text("AMOUNT", 160, 100); // Removed UNIT PRICE column

      // Draw a thin horizontal line under the header
      doc.line(10, 102, 200, 102);
    };

    // Render the top section on the first page
    renderTopSection();

    // Start rendering the table body (items)
    let currentY = 108; // Start Y position for items, after the header section

    // Calculate the total amount
    let total = 0;

    items.forEach((item, index) => {
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const amount = item.quantity * unitPrice;
      total += amount; // Add the item amount to the total

      // Wrap item name and description if too long
      const itemName = doc.splitTextToSize(item.name, 70); // Wrapping item name
      const itemDescription = doc.splitTextToSize(item.description, 70); // Wrapping description

      // Check if currentY goes beyond the page height
      if (
        currentY + 20 + (itemName.length + itemDescription.length - 2) * 5 >
        pageHeight - 20
      ) {
        doc.addPage(); // Add a new page
        renderTopSection(); // Re-draw the top section on new page
        currentY = 108; // Reset Y position for the new page
      }

      // Draw item row
      doc.text(item.quantity.toString(), 10, currentY);
      doc.text(itemName, 40, currentY); // Wrapped item name text
      doc.text(`$${amount.toFixed(2)}`, 160, currentY);

      // Move to the next line for the description
      currentY += 10 + (itemName.length - 1) * 5;
      doc.text(itemDescription, 40, currentY); // Wrapped description text

      // Adjust Y position based on the height of the wrapped item description
      currentY += 10 + (itemDescription.length - 1) * 5;
    });

    // Subtotal and Tax
    currentY += 10;
    if (currentY + 20 > pageHeight) {
      doc.addPage(); // Add new page if needed
      renderTopSection(); // Re-draw the top section on new page
      currentY = 108;
    }

    const subtotal = total;
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount; // Total is subtotal plus tax

    doc.text("Subtotal:", 120, currentY);
    doc.text(`$${subtotal.toFixed(2)}`, 160, currentY);

    doc.text(`Sales Tax ${taxRate}%:`, 120, currentY + 10);
    doc.text(`$${taxAmount.toFixed(2)}`, 160, currentY + 10);

    // Total in larger font
    currentY += 30;
    if (currentY + 10 > pageHeight) {
      doc.addPage();
      renderTopSection(); // Re-draw the top section on new page
      currentY = 150;
    }

    doc.setFontSize(14);
    doc.text("Total:", 120, currentY);
    doc.text(`$${grandTotal.toFixed(2)}`, 160, currentY);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const amount = item.quantity * item.unitPrice;
      return total + amount + (amount * taxRate) / 100;
    }, 0);
  };
  const tabData = [
    { label: "Account Info", icon: faUser },
    { label: "Service Locations", icon: faMapMarkerAlt },
    { label: "Job Information", icon: faMoneyBill },
    // { label: "Equipment", icon: faTools },
    { label: "Documents", icon: faFileAlt },
    { label: "History", icon: faHistory },
    { label: "Invoice", icon: faFileAlt },
    { label: "Logs", icon: faFolderOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tab-content account-info">
            <strong>Leads Graph Report</strong>
            <canvas id="myChart"></canvas>
          </div>
        );

      case 1:
        return (
          <div className="tab-content service-locations">
            <h2 style={{ color: "black" }}>Service Locations</h2>
          </div>
        );

      case 2:
        return (
          <div className="tab-content job-information">
            <h2 style={{ color: "black" }}>Job Information</h2>
          </div>
        );

      case 3:
        return (
          <div className="tab-content documentstab">
            <h2 style={{ color: "black" }}>Documents</h2>
          </div>
        );

      case 4:
        return (
          <div className="tab-content historytab">
            <h2 style={{ color: "black" }}>History</h2>
          </div>
        );

      case 5:
        return (
          <div className="tab-content invoicecreator">
            <h2 style={{ color: "black" }}>Invoice</h2>
          </div>
        );

      case 6:
        return (
          <div className="tab-content logstab">
            <h2 style={{ color: "black" }}>Logs</h2>
            <h1>Under maintenance - Jaime working on it !</h1>
          </div>
        );
      // Other cases for Financial Data, Equipment, etc.
      default:
        return null;
    }
  };

  return (
    <div>
      <Header onSignOut={handleSignOut} />
      <Navbar onSignOut={handleSignOut} />

      <div className="tabs-container">
        <div className="tab-buttons">
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              isActive={index === activeTab}
              onClick={() => setactiveTab(index)}
            />
          ))}
        </div>

        <div className="tab-content-wrapper">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Tabs;
