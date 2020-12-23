import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
// import reportWebVitals from './reportWebVitals';
import { loadParkhausData } from './actions/parkhaus';
import { loadAaseeData } from './actions/aasee';
import { loadOsemData } from './actions/opensensemap';
import { loadPedestrianData } from './actions/passanten';
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
store.dispatch(loadAaseeData());
store.dispatch(loadOsemData());
store.dispatch(loadPedestrianData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
