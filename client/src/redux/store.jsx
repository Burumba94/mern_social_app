import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';

const initialState = {}; // default initial state

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default DataProvider;