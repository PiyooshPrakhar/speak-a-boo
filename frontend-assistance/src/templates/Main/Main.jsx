import React from "react";
import { useSelector } from "react-redux";
import { AppRoutes } from "../../routes";
import { ToastContainer } from "react-toastify";
import { LogoutDialog } from "../../components/dialog/logout";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const dialog = useSelector((state) => state.dialog);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
      {dialog.showLogoutDialog && <LogoutDialog />}
    </>
  );
}

export default Main;
