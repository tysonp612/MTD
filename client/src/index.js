//React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Redux
import { store } from "./redux/store/store";
import { Provider } from "react-redux";

//App
import "./index.css";

import App from "./App";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
