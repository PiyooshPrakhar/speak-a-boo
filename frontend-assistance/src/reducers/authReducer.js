import { authActions } from "../actions";

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: null,
  registrationStatus: null,
  forgotPasswordStatus: {},
  emailVerification: null,
};

export const authReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case authActions.LOGIN_USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case authActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case authActions.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      };

    case authActions.REGISTER_USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case authActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        registrationStatus: action.payload,
        error: null,
      };
    case authActions.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registrationStatus: {},
      };

    case authActions.FORGOT_PASS_INIT:
      return {
        ...state,
        loading: true,
      };
    case authActions.FORGOT_PASS_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotPasswordStatus: action.payload,
        error: null,
      };
    case authActions.FORGOT_PASS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        forgotPasswordStatus: {},
      };

    case authActions.VERIFY_USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case authActions.VERIFY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        emailVerification: action.payload,
        error: null,
      };
    case authActions.VERIFY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        emailVerification: null,
      };

    case authActions.SAVE_USER_DATA:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case authActions.RESET_USER_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
};
