import React from "react";
import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="site-header row mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <div className="p-2">
              <Link to={"/"} className="navbar-brand">
                <img
                  src="https://via.placeholder.com/260x100.png?text=EmployeeLogo"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
