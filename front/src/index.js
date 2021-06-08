import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import store from './store/store'
import { Provider } from 'react-redux'
import { loadMyUser } from './store/userSlice';

store.dispatch(loadMyUser())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);