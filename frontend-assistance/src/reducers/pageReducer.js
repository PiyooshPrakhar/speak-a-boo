import { pageActions } from "../actions";

const INITIAL_STATE = {
  currentPage: null,
  previousPage: null,
};

export const pageReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case pageActions.SET_NEXT_PAGE:
      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: action.payload,
      };

    case pageActions.RESET_PAGE_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
