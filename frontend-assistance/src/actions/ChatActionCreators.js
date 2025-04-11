import { chatActions } from ".";

export const startUserChatInit = () => {
  return {
    type: chatActions.START_USER_CHAT_INIT,
  };
};

export const startUserChatSuccess = (chat) => {
  return {
    type: chatActions.START_USER_CHAT_SUCCESS,
    payload: chat,
  };
};

export const startUserChatFailure = (error) => {
  return {
    type: chatActions.START_USER_CHAT_FAILURE,
    payload: error,
  };
};

export const getNextStatementInit = () => {
  return {
    type: chatActions.GET_NEXT_STATEMENT_INIT,
  };
};

export const getNextStatementSuccess = (chat) => {
  return {
    type: chatActions.GET_NEXT_STATEMENT_SUCCESS,
    payload: chat,
  };
};

export const getNextStatementFailure = (error) => {
  return {
    type: chatActions.GET_NEXT_STATEMENT_FAILURE,
    payload: error,
  };
};

export const getChatHistoryInit = () => {
  return {
    type: chatActions.GET_CHAT_HISTORY_INIT,
  };
};

export const getChatHistorySuccess = (userData) => {
  return {
    type: chatActions.GET_CHAT_HISTORY_SUCCESS,
    payload: userData,
  };
};

export const getChatHistoryFailure = (error) => {
  return {
    type: chatActions.GET_CHAT_HISTORY_FAILURE,
    payload: error,
  };
};

export const saveAvatarPreferenceInit = () => {
  return {
    type: chatActions.SAVE_AVATAR_PREFERENCE_INIT,
  };
};

export const saveAvatarPreferenceSuccess = (userData) => {
  return {
    type: chatActions.SAVE_AVATAR_PREFERENCE_SUCCESS,
    payload: userData,
  };
};

export const saveAvatarPreferenceFailure = (error) => {
  return {
    type: chatActions.SAVE_AVATAR_PREFERENCE_FAILURE,
    payload: error,
  };
};

export const clearUserChatData = () => {
  return {
    type: chatActions.CLEAR_USER_CHAT,
  };
};

export const resetUserChatData = () => {
  return {
    type: chatActions.RESET_USER_CHAT,
  };
};

export const getDataPointInit = () => {
  return {
    type: chatActions.GET_DATA_POINTS_INIT,
  };
};

export const getDataPointSuccess = (userData) => {
  return {
    type: chatActions.GET_DATA_POINTS_SUCCESS,
    payload: userData,
  };
};

export const getDataPointFailure = (error) => {
  return {
    type: chatActions.GET_DATA_POINTS_FAILURE,
    payload: error,
  };
};