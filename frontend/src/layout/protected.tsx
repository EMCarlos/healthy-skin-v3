import useGeneralStore from "@/store/useGeneralStore";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
const Protected: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { userLogged, isLogged } = useGeneralStore();

  // TODO: Check if the user is authenticated
  useEffect(() => {
    if (!isLogged) navigate("/signin");
  }, [isLogged]);

  return <Fragment>{children}</Fragment>;
};

export default Protected;
