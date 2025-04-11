import { authActions } from "./";

export const loginUserInit = () => {
  return {
    type: authActions.LOGIN_USER_INIT,
  };
};

export const loginUserSuccess = (userData) => {
  return {
    type: authActions.LOGIN_USER_SUCCESS,
    payload: userData,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: authActions.LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const registerUserInit = () => {
  return {
    type: authActions.REGISTER_USER_INIT,
  };
};

export const registerUserSuccess = (registerData) => {
  return {
    type: authActions.REGISTER_USER_SUCCESS,
    payload: registerData,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: authActions.REGISTER_USER_FAILURE,
    payload: error,
  };
};

export const forgotPasswordInit = () => {
  return {
    type: authActions.FORGOT_PASS_INIT,
  };
};

export const forgotPasswordSuccess = (forgotPasswordStatus) => {
  return {
    type: authActions.FORGOT_PASS_SUCCESS,
    payload: forgotPasswordStatus,
  };
};

export const forgotPasswordFailure = (error) => {
  return {
    type: authActions.FORGOT_PASS_FAILURE,
    payload: error,
  };
};

export const verifyUserInit = () => {
  return {
    type: authActions.VERIFY_USER_INIT,
  };
};

export const verifyUserSuccess = (userEmail) => {
  return {
    type: authActions.VERIFY_USER_SUCCESS,
    payload: userEmail,
  };
};

export const verifyUserFailure = (error) => {
  return {
    type: authActions.VERIFY_USER_FAILURE,
    payload: error,
  };
};

export const saveUserDetails = (userDetails) => {
  return {
    type: authActions.SAVE_USER_DATA,
    payload: userDetails,
  };
}

export const resetUserData = () => {
  return {
    type: authActions.RESET_USER_DATA,
  };
};