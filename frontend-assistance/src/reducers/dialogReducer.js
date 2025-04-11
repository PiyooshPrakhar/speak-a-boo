import { dialogActions } from "../actions";

const INITIAL_STATE = {
  showLogoutDialog: false,
};

export const dialogReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case dialogActions.ATTEMPT_LOGOUT:
      return {
        ...state,
        showLogoutDialog: action.payload,
      };

    case dialogActions.RESET_DIALOG:
      return INITIAL_STATE;

    default:
      return state;
  }
};
