import { SearchQueryActionTypes } from "./search-query.types";

const INITIAL_STATE = {
  query: null,
};

export const queryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchQueryActionTypes.SEARCH_QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
