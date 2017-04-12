import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux.js';

import App from './App.jsx';
import './index.scss';

const middlewareStoreEnhancer = applyMiddleware(
	thunkMiddleware.withExtraArgument({
		localStorage
	})
);

const devToolStoreEnhancer =
	(window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()) ||
	((x) => x);

const store = createStore(
	reducer,
	compose(middlewareStoreEnhancer, devToolStoreEnhancer)
);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);