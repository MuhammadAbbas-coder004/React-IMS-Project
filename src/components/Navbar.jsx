import React from "react";
import { signOut } from "firebase/auth";

import { auth } from "../config/firebaseconfig/firebaseconfig";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch(() => alert("error occurred"));
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Navbar;
