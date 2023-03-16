import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5077/api/employees/list")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  console.log(employees);

  const handleDelete = (id) => {
    fetch(`http://localhost:5077/api/employees/delete?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setEmployees(employees.filter((employee) => employee.id !== id));
          alert("Employee deleted!");
        } else {
          throw new Error("Failed to delete employee");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete employee");
      });
  };

  return employees ? (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Employees</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={"/create"}>
            <div className="btn-group mr-2">
              <button className="btn btn-outline-secondary">
                Add employee
              </button>
            </div>
          </Link>
        </div>
      </div>

      {employees.map((object) => (
        <div key={object.role}>
          <h2>{object.role}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Salary</th>
              </tr>
            </thead>
            <tbody>
              {object.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link to={`/employee/${employee.id}`}>
                      <button className="btn btn-outline-secondary">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <div className="btn-group mr-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  ) : null;
};

export default EmployeeList;
