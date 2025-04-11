import { authActionCreator, chatActionCreators } from "../actions";
import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";

export const saveAvatarPreferences = (userProfile) => {
  return (dispatch) => {
    dispatch(chatActionCreators.saveAvatarPreferenceInit());
    axiosInstance
      .post("api/v1/chat/saveAvatar", userProfile)
      .then((response) => response.data)
      .then((userData) => {
        dispatch(authActionCreator.saveUserDetails(userData));
        dispatch(
          chatActionCreators.saveAvatarPreferenceSuccess(
            userData.avatarPreference
          )
        );
        toast.success("Avatar preference saved!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        chatActionCreators.saveAvatarPreferenceFailure(error.response.data);
        toast.error("Failed to save preferences", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const startUserSession = (chatDetails) => {
  return (dispatch) => {
    dispatch(chatActionCreators.startUserChatInit());
    axiosInstance
      .post("api/v1/chat/startUserSession", chatDetails)
      .then((response) => response.data)
      .then((chatData) => {
        dispatch(chatActionCreators.startUserChatSuccess(chatData));
      })
      .catch((error) => {
        chatActionCreators.startUserChatFailure(error.response.data);
        toast.error("Failed to start session", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const getNextStatement = (chatDetails) => {
  return (dispatch) => {
    dispatch(chatActionCreators.getNextStatementInit());
    axiosInstance
      .post("api/v1/chat/getNextStatement", chatDetails)
      .then((response) => response.data)
      .then((chatData) => {
        dispatch(chatActionCreators.getNextStatementSuccess(chatData));
      })
      .catch((error) => {
        dispatch(
          chatActionCreators.getNextStatementFailure(error.response.data)
        );
        toast.error(
          "OOPS! Something went wrong. Please close this session and try again.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };
};

export const getChatHistory = (userDetails) => {
  return (dispatch) => {
    dispatch(chatActionCreators.getChatHistoryInit());
    axiosInstance
      .post("api/v1/chat/getChatHistory", userDetails)
      .then((response) => response.data)
      .then((chatData) => {
        dispatch(chatActionCreators.getChatHistorySuccess(chatData));
      })
      .catch((error) => {
        dispatch(chatActionCreators.getChatHistoryFailure(error.response.data));
        if (error.response.data.errorCode !== "CHAT_HISTORY_NOT_FOUND")
          toast.error("Failed to fetch chat histories", {
            position: toast.POSITION.TOP_RIGHT,
          });
      });
  };
};

export const getDataPoint = (userDetails) => {
  return (dispatch) => {
    dispatch(chatActionCreators.getDataPointInit());
    axiosInstance
      .post("api/v1/chat/getDataPoint", userDetails)
      .then((response) => response.data)
      .then((chatData) => {
        dispatch(chatActionCreators.getDataPointSuccess(chatData));
      })
      .catch((error) => {
        dispatch(chatActionCreators.getDataPointFailure(error.response.data));
        toast.error("Error Retrieving all data points for graph", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};
