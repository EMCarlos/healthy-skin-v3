import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
const Protected: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  // TODO: Check if the user is authenticated
  const isAuthenticated = true;
  if (!isAuthenticated) navigate("/signin");

  return <Fragment>{children}</Fragment>;
};

export default Protected;
