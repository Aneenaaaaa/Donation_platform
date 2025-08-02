import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#f0f0f0", padding: "20px" }}>
      <h3>Admin Panel</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/users">User Management</Link></li>
          <li><Link to="/campaigns">Campaign Approval</Link></li>
          <li><Link to="/donations">All Donations</Link></li>
          <li><Link to="/reports">Reports/Charts</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
