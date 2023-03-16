import React, { useState } from "react";
import axios from "axios";

const NewEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rank: "",
    isCEO: false,
    isManager: false,
    managerId: undefined,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, rank } = formData;
    const newErrors = {};

    if (!firstName || typeof firstName !== "string") {
      newErrors.firstName = "Please enter a valid first name.";
    }
    if (!lastName || typeof lastName !== "string") {
      newErrors.lastName = "Please enter a valid last name.";
    }
    if (!rank || isNaN(rank) || rank < 1 || rank > 10) {
      newErrors.rank = "Please enter a valid rank between 1 and 10.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post("http://localhost:5077/api/employees/create", formData)
        .then((response) => {
          console.log(response.data);
          setFormData({
            firstName: "",
            lastName: "",
            rank: "",
            isCEO: false,
            isManager: false,
            managerId: undefined,
          });
          alert("Employee added!");
        })
        .catch((error) => {
          console.log(error);
          alert("Employee not added, technical error!");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-25">
      <div className="form-group mt-2">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="form-control"
          pattern="[A-Za-z]+"
          title="Please enter only alphabetical characters"
        />
        {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="form-control"
          pattern="[A-Za-z]+"
          title="Please enter only alphabetical characters"
        />
        {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="rank">Rank:</label>
        <input
          type="number"
          id="rank"
          name="rank"
          value={formData.rank}
          onChange={handleInputChange}
          min="1"
          max="10"
          required
          className="form-control  w-50"
        />
        {errors.rank && <p className="text-danger">{errors.rank}</p>}
      </div>

      <div className="form-group form-check mt-2">
        <input
          type="checkbox"
          id="isCEO"
          name="isCEO"
          checked={formData.isCEO}
          onChange={handleInputChange}
          className="form-check-input"
        />
        <label htmlFor="isCEO" className="form-check-label">
          Is CEO
        </label>
      </div>
      <div className="form-group form-check mt-2">
        <input
          type="checkbox"
          id="isManager"
          name="isManager"
          checked={formData.isManager}
          onChange={handleInputChange}
          className="form-check-input"
        />
        <label htmlFor="isManager" className="form-check-label">
          Is Manager
        </label>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="managerId">Manager ID:</label>
        <input
          type="number"
          id="managerId"
          name="managerId"
          min="1"
          value={formData.managerId}
          onChange={handleInputChange}
          className="form-control w-50"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Create Employee
      </button>
    </form>
  );
};

export default NewEmployee;
