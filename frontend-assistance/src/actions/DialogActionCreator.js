import { dialogActions } from "./";

export const showLogoutDialog = (showLogoutDialog) => {
  return {
    type: dialogActions.ATTEMPT_LOGOUT,
    payload: showLogoutDialog,
  };
};

export const resetDialog = () => {
  return {
    type: dialogActions.RESET_DIALOG,
  };
};
