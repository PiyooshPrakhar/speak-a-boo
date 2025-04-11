import { authActionCreator } from "../actions";
import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";

export const performLogin = (loginData) => {
  return (dispatch) => {
    dispatch(authActionCreator.loginUserInit());
    axiosInstance
      .post("api/v1/user/login", loginData)
      .then((response) => response.data)
      .then((userData) => {
        dispatch(authActionCreator.loginUserSuccess(userData));
      })
      .catch((error) => {
        dispatch(authActionCreator.loginUserFailure(error.response.data));
        toast.error("Incorrect email or password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const performRegistration = (registerData) => {
  return (dispatch) => {
    dispatch(authActionCreator.registerUserInit());
    axiosInstance
      .post("api/v1/user/register", registerData)
      .then((response) => response.data)
      .then((userData) => {
        dispatch(authActionCreator.registerUserSuccess(userData));
        toast.success("Account registered Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        dispatch(authActionCreator.registerUserFailure(error.response.data));
        toast.error("Account registration failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const performForgotPassword = (forgotPasswordStatus) => {
  return (dispatch) => {
    dispatch(authActionCreator.forgotPasswordInit());
    axiosInstance
      .post("api/v1/user/forgotPassword", forgotPasswordStatus)
      .then((response) => response.data)
      .then((userData) => {
        dispatch(authActionCreator.forgotPasswordSuccess(userData));
        toast.success("Password changed successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
      })
      .catch((error) =>
        dispatch(authActionCreator.forgotPasswordFailure(error.response.data))
      );
  };
};

export const performUserVerification = (userEmail) => {
  return (dispatch) => {
    dispatch(authActionCreator.verifyUserInit());
    axiosInstance
      .post("api/v1/user/verify", userEmail)
      .then((response) => response.data)
      .then((userData) =>
        dispatch(authActionCreator.verifyUserSuccess(userData))
      )
      .catch((error) =>
        dispatch(authActionCreator.verifyUserFailure(error.response.data))
      );
  };
};
