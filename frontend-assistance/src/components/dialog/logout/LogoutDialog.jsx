import React, { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  authActionCreator,
  chatActionCreators,
  dialogActionCreator,
  pageActionCreator,
} from "../../../actions";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutDialog() {
  const dispatch = useDispatch();
  const pageSelection = useSelector((state) => state.page);

  const handleCancel = () => {
    dispatch(pageActionCreator.setNextPage(pageSelection.previousPage));
    dispatch(dialogActionCreator.showLogoutDialog(false));
    window.path = "/analytics";
  };

  const handleOk = () => {
    dispatch(dialogActionCreator.showLogoutDialog(false));
    dispatch(authActionCreator.resetUserData());
    dispatch(pageActionCreator.resetPageData());
    dispatch(chatActionCreators.resetUserChatData());
    dispatch(dialogActionCreator.resetDialog());

    window.path = "/";
  };

  const muiStyles = {
    logoutTitle: {
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "25px",
      fontWeight: 600,
    },
    logoutSubTitle: {
      fontSize: "18px",
      color: "#000",
    },
    button: {
      fontSize: "16px",
      fontWeight: 500,
    },
  };

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={muiStyles.logoutTitle}>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={muiStyles.logoutSubTitle}
            id="alert-dialog-slide-description"
          >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={muiStyles.button} onClick={handleCancel}>
            Cancel
          </Button>
          <Button sx={muiStyles.button} onClick={handleOk}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
