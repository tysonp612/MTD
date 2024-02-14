import { createStore, applyMiddleware } from "redux";
import rootReducer from "./../root-reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

const middlewares = [logger];

// Correctly compose enhancers and middleware
const storeEnhancer = composeWithDevTools(
	applyMiddleware(...middlewares)
	// other store enhancers if any
);

const store = createStore(
	rootReducer, // Pass the root reducer as the first argument
	storeEnhancer // Pass the composed enhancers and middleware as the second argument
);

const persistor = persistStore(store);

export { store, persistor };
