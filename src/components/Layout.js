import React from "react";
import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
