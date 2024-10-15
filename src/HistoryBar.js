import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const HistoryBar = () => {
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState([]);

  useEffect(() => {
    // Update the visited pages when the location changes
    setVisitedPages((prevPages) => [...prevPages, location.pathname]);
  }, [location.pathname]);

  return (
    <div className="history-bar">
      <p>
        {visitedPages.map((page, index) => (
          <React.Fragment key={page}>
            {index > 0 && " > "}
            <Link to={page}>{page}</Link>
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default HistoryBar;
