import { chatActions } from "../actions";

const INITIAL_STATE = {
  chats: {},
  loading: false,
  error: null,
  chatHistory: [],
  avatarPreference: { key: 0, name: "Michael", companionType: "Male" },
  datapoints: {},
};

export const chatReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case chatActions.START_USER_CHAT_INIT:
      return {
        ...state,
        loading: true,
      };
    case chatActions.START_USER_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
        error: null,
      };
    case chatActions.START_USER_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        chats: {},
      };

    case chatActions.GET_NEXT_STATEMENT_INIT:
      return {
        ...state,
        loading: true,
      };
    case chatActions.GET_NEXT_STATEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
        error: null,
      };
    case chatActions.GET_NEXT_STATEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        chats: [],
      };

    case chatActions.GET_CHAT_HISTORY_INIT:
      return {
        ...state,
        loading: true,
      };
    case chatActions.GET_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        chatHistory: action.payload,
        error: null,
      };
    case chatActions.GET_CHAT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        chatHistory: [],
      };
    case chatActions.SAVE_AVATAR_PREFERENCE_INIT:
      return {
        ...state,
        loading: true,
      };
    case chatActions.SAVE_AVATAR_PREFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        avatarPreference: action.payload,
        error: null,
      };
    case chatActions.SAVE_AVATAR_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        avatarPreference: {},
      };

    case chatActions.GET_DATA_POINTS_INIT:
      return {
        ...state,
        loading: true,
      };
    case chatActions.GET_DATA_POINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        datapoints: action.payload,
        error: null,
      };
    case chatActions.GET_DATA_POINTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        datapoints: {},
      };

    case chatActions.CLEAR_USER_CHAT:
      return {
        ...state,
        chats: {},
      };
    case chatActions.RESET_USER_CHAT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
