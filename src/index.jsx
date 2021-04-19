import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import {
  loadParkhausData,
  loadParkhausTimeseriesData,
} from './actions/parkhaus';
import { loadAaseeData } from './actions/aasee';
import { loadOsemData } from './actions/opensensemap';
import { loadPedestrianData } from './actions/passanten';
import { loadBicycleData } from './actions/bicycle';

import mainReducer from './reducers';
import rootSaga from './sagas';

import './index.css';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// we might want to run that somewhere else
store.dispatch(loadParkhausData());
let from = new Date();
from.setDate(from.getDate() - 1);
store.dispatch(loadParkhausTimeseriesData(from, new Date()));
store.dispatch(loadAaseeData());
store.dispatch(loadOsemData());
store.dispatch(loadPedestrianData());
store.dispatch(loadBicycleData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
