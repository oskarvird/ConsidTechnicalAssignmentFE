import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  let id = useParams();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    rank: "",
    isCEO: false,
    isManager: false,
    managerId: null,
  });

  console.log(employee);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5077/api/employees/get?id=${id.id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data));
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "managerId" && value === "") {
      setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: null }));
    } else {
      setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }
  };

  console.log(employee);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:5077/api/employees/update", employee)
      .then((response) => {
        console.log(response.data);
        alert("Employee updated!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Employee not updated, technical error!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-25">
      <div className="form-group mt-2">
        <label htmlFor="FirstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue={employee.firstName}
          onChange={handleChange}
          required
          className="form-control"
          pattern="[A-Za-z]+"
          title="Please enter only alphabetical characters"
        />
        {errors.FirstName && <div>{errors.FirstName}</div>}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="LastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={employee.lastName}
          onChange={handleChange}
          required
          className="form-control"
          pattern="[A-Za-z]+"
          title="Please enter only alphabetical characters"
        />
        {errors.LastName && <div>{errors.LastName}</div>}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="rank">Rank:</label>
        <input
          type="number"
          id="rank"
          name="rank"
          defaultValue={employee.rank}
          onChange={handleChange}
          min="1"
          max="10"
          required
          className="form-control  w-50"
        />
        {errors.rank && <p className="text-danger">{errors.rank}</p>}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="IsCEO">Is CEO:</label>
        <input
          type="checkbox"
          id="isCEO"
          name="isCEO"
          checked={employee.isCEO}
          onChange={handleChange}
          className="form-check-input"
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="IsManager">Is Manager:</label>
        <input
          type="checkbox"
          id="isManager"
          name="isManager"
          checked={employee.isManager}
          onChange={handleChange}
          className="form-check-input"
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="ManagerId">Manager ID:</label>
        <input
          type="number"
          id="managerId"
          name="managerId"
          min="1"
          value={employee.managerId === null ? "" : employee.managerId}
          onChange={handleChange}
          className="form-control  w-50"
        />
        {errors.ManagerId && <div>{errors.ManagerId}</div>}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Update
      </button>
    </form>
  );
};

export default EditEmployee;
