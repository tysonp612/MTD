import { combineReducers } from "redux";
import { userReducer } from "./reducers/user/user.reducer";
import { cartReducer } from "./reducers/cart/cart.reducer";
import { queryReducer } from "./reducers/search-query/search-query.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  user: userReducer,
  query: queryReducer,
  cart: cartReducer,
});
export default persistReducer(persistConfig, rootReducer);
