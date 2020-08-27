import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
// import {createLogger} from 'redux-logger'

import { composeWithDevTools } from "redux-devtools-extension";
// import reducers
import reducers from "./reducers";
// Import Sagas
import sagas from "./sagas";

export default function createStoreWithMiddleware(initalState, history) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  //
  // const logger = createLogger({
  //   // Without Form action - to many of them
  //   predicate: (getState, action) => action.type !== 'CHANGE_FORM'
  // })
  // Combine middlewares to one array
  const middleware = [reduxRouterMiddleware, sagaMiddleware];
  const store = createStore(
    reducers,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  // Combine sagas to one array

  sagas.forEach((saga) => sagaMiddleware.run(saga));

  // Setup hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
