import { useEffect } from "react";

const UseContainerVisibility = (containerId, showButtonIds, closeButtonId) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    const showButtons = showButtonIds.map((id) => document.getElementById(id));
    const closeButton = document.getElementById(closeButtonId);

    const showContainer = () => {
      container.style.display = "block";
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
    };

    const hideContainer = () => {
      container.style.display = "none";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        hideContainer();
      }
    };

    const handleClickOutside = (event) => {
      if (
        !container.contains(event.target) &&
        !showButtons.includes(event.target)
      ) {
        hideContainer();
      }
    };

    showButtons.forEach((button) => {
      button.addEventListener("click", showContainer);
    });

    closeButton.addEventListener("click", hideContainer);

    return () => {
      showButtons.forEach((button) => {
        button.removeEventListener("click", showContainer);
      });
      closeButton.removeEventListener("click", hideContainer);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerId, showButtonIds, closeButtonId]);
};

export default UseContainerVisibility;
