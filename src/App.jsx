import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* You can add Navbar here later */}
      <Outlet />
    </div>
  );
}

export default App;
