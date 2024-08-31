import React from 'react';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul>
        <li><a href="/">Option 1</a></li>
        <li><a href="/">Option 2</a></li>
        <li><a href="/">Option 3</a></li>
        <li><a href="/">Option 4</a></li>
        <li><a href="/seek-ceus">Seek CEUs</a></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
