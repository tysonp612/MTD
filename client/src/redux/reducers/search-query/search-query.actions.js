import { SearchQueryActionTypes } from "./search-query.types";

export const searchQuery = (query) => {
  return { type: SearchQueryActionTypes.SEARCH_QUERY, payload: query };
};
