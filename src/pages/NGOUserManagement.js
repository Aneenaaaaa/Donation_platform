import React, { useEffect, useState } from "react";

function NGOUserManagement() {
  const [ngoUsers, setNgoUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ngousers")
      .then(res => res.json())
      .then(data => setNgoUsers(data))
      .catch(err => console.error("Error fetching NGO users:", err));
  }, []);

  return (
    <div className="main-container">
      <h2>Registered NGO Users</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Registration No.</th>
              <th>Email</th>
              <th>Username</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {ngoUsers.length > 0 ? (
              ngoUsers.map((ngo) => (
                <tr key={ngo._id}>
                  <td>{ngo.orgName}</td>
                  <td>{ngo.regNumber}</td>
                  <td>{ngo.email}</td>
                  <td>{ngo.username}</td>
                  <td>{ngo.address}</td>
                  <td>{ngo.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No NGO users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NGOUserManagement;
