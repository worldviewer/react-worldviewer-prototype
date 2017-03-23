import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux.js';

import AppState from './AppState';
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
		<AppState />
	</Provider>,
	document.getElementById('root')
);