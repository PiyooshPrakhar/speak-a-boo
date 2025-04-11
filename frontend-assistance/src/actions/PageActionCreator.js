import { pageActions } from "./";

export const setNextPage = (nextPage) => {
  return {
    type: pageActions.SET_NEXT_PAGE,
    payload: nextPage,
  };
};

export const resetPageData = () => {
  return {
    type: pageActions.RESET_PAGE_DATA,
  };
};
