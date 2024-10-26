import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Content from './components/content/Content';
import Main from './components/content/Main';
import NotFound from './components/NotFound';
import Modal from './components/LogoutModal';
import GameHeader from './components/game/header/GameHeader';
import QCM from './components/game/games/QCM';
import Game from './components/game/Game';
import { useEffect, useState } from 'react';
import LogoutModal from './components/LogoutModal';
import StartPaly from './components/game/StartPaly';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayer } from './redux/PlayerReducer';
import Spinner from './components/spinner/Spinner';


function App() {

  // const [player, setPlayer] = useState(
  //   {
  //     "id": 948370925,
  //     "name": "mark lee",
  //     "gender": "male",
  //     "email": "marklee@gmail.com",
  //     "password": "$2y$12$DzKn6hXgyzQIqMJwyOcZquklh0zT9/1QOc3P42THw5YqIYQKr2uYK",
  //     "country": "morocco",
  //     "avatar_id": null,
  //     "nlang_id": 1,
  //     "glang_id": 2,
  //     "level": "A1",
  //     "points": "0.00",
  //     "wins": 0,
  //     "losses": 0,
  //     "coins": 500,
  //     "state": 0,
  //     "created_at": "2024-06-02T13:48:29.000000Z",
  //     "updated_at": "2024-06-02T13:48:29.000000Z",
  //     "avatar": null,
  //     "native_language": {
  //         "id": 1,
  //         "language": "English",
  //         "native_state": 1,
  //         "goal_state": 1,
  //         "short_form": "EN",
  //         "created_at": null,
  //         "updated_at": null
  //     },
  //     "goal_language": {
  //         "id": 2,
  //         "language": "Arabic",
  //         "native_state": 1,
  //         "goal_state": 1,
  //         "short_form": "AR",
  //         "created_at": null,
  //         "updated_at": null
  //     }
  // }
  // )

  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  const player = useSelector((state) => state.player?.player);
  // const status = useSelector((state) => state.user?.status);
  // const location = useLocation();
  // const [prevLocation, setPrevLocation] = useState(location.pathname);

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


  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (!player) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Login />} />

        </Routes>
      </BrowserRouter>
        
    )
  }



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Main player={player} />
          }/>
          <Route path='/waiting' element={<StartPaly />} />
          <Route path='/qcm' element={<Game />} />
          <Route path='/profile' element={
            <Content page='profile' player={player} />
          }/>
          <Route path='/shop' element={
            <Content page='shop' player={player} />
          }/>
          <Route path='/notifications' element={
            <Content page='notifications' player={player} />
          }/>
          <Route path='/friends' element={
            <Content page='friends' player={player} />
          }/>
          <Route path='/notifications' element={
            <Content page='notifications' player={player} />
          }/>
          <Route path='/invitations' element={
            <Content page='invitations' player={player} />
          }/>
          <Route path='/setting' element={
            <Content page='setting' player={player} />
          }/>

          <Route path='/register' element={<Main player={player}/>} />
          <Route path='/login' element={<Main player={player}/>} />
          {/* <Route path='/game-header' element={<GameHeader />} />
          <Route path='*' element={<NotFound />} /> */}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
