import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import './index.css'
import PlayerReducer from './redux/PlayerReducer';
import AuthReducer from './redux/AuthReducer';


const store = configureStore({
  reducer: {
  //   announces: AnnounceReducer,
  //   favourites: FavouriteReducer,
    auth: AuthReducer,
    player: PlayerReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);