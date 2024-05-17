import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

export default function Verify() {
  const { user } = useAuthContext();

  return user?.is_admin ? (
    <>
      <Navigate
        to={"/dashboard"}
        state={{ message: `Welcome, ${user?.name}` }}
      />
    </>
  ) : (
    <>
      <Navigate to={"/"} state={{ message: `Welcome, ${user?.name}` }} />
    </>
  );
}
