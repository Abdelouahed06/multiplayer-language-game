import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import Dashboard from './pages/Dashboard';

import Admins from './pages/Users/Admins';
import Players from './pages/Users/Players';

import Avatars from './pages/Games_Option/Avatars';
import Messages from './pages/Games_Option/Messages';
import Langueses from './pages/Games_Option/Langueses';
import Images from './pages/Games_Option/Images';


import Game_a from './pages/Games_Managmant/Game_a';
import Game_b from './pages/Games_Managmant/Game_b';
import Game_c from './pages/Games_Managmant/Game_c';
import Game_d from './pages/Games_Managmant/Game_d';
import Game_e from './pages/Games_Managmant/Game_e';

import Settings from './pages/Settings';
import Login from './pages/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayer } from './redux/AuthReducer';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();



  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  const player = useSelector((state) => state.auth?.player);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log(token)
    if (token) {
      dispatch(fetchPlayer(token)).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, dispatch]);

  useEffect(() => {
    console.log(player)
  }, [player]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (!player) {
    return (
      // <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Login />} />

        </Routes>
      // </BrowserRouter>
        
    )
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/Users/Admins"
          element={
            <>
              <Admins />
            </>
          }
        />
        <Route
          path="/Users/Players"
          element={
            <>
              <Players />
            </>
          }
        />
         <Route
          path="/games-tools/Langueses"
          element={
            <>
              <Langueses />
            </>
          }
        />
        <Route
          path="/games-tools/avatars"
          element={
            <>
              <Avatars />
            </>
          }
        />
         <Route
          path="/games-tools/messages"
          element={
            <>
              <Messages />
            </>
          }
        />
        <Route
          path="/games-tools/images"
          element={
            <>
              <Images />
            </>
          }
        />
         <Route
          path="/games-managmant/Vocabulary"
          element={
            <>
              <Game_a />
            </>
          }
        />
        <Route
          path="/games-managmant/Grammar"
          element={
            <>
              <Game_b />
            </>
          }
        />
        <Route
          path="/games-managmant/Listening"
          element={
            <>
              <Game_c />
            </>
          }
        />
        <Route
          path="/games-managmant/Writing"
          element={
            <>
              <Game_d />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Settings admin={player}/>
            </>
          }
        />
        <Route path='*' element={<Dashboard />} />

        
      </Routes>
    </>
  );
}

export default App;
