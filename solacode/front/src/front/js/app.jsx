import React from "react";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <h2>App page</h2>
      <Outlet />
    </>
  );
}

export default App;