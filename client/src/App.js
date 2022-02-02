import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Admin from "./layouts/Admin/Admin";
import GameMod from "./components/adminComponents/GameMod/GameMod";
import GameType from "./components/adminComponents/GameType/GameType";
import GameImage from './components/adminComponents/GameImage/GameImage';
import Dashboard from './layouts/Dashboard/Dashboard';
import Login from './components/adminComponents/Login/Login'
import Game from './components/gameComponents/Game/Game';
import NormalMod from './components/gameComponents/NormalMod/NormalMod';
import AgainstTimeMod from './components/gameComponents/AgainstTimeMod/AgainstTimeMod';
import LimitedClickMod from './components/gameComponents/LimitedClickMod/LimitedClickMod';
import BestPlayers from './components/gameComponents/BestPlayers/BestPlayers';


function App() {


  const auth = useSelector(state => state.authReducer)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard isAuthenticated={auth.isAuthenticated} />}>
          </Route>

          <Route path="/admin" element={<Admin isAuthenticated={auth.isAuthenticated} claim={auth.currentUser.claim} />}>
            <Route path="oyuntipi" element={<GameType />}></Route>
            <Route path="oyunmodu" element={<GameMod />}></Route>
            <Route path="oyunresimleri/:id" element={<GameImage />}></Route>
          </Route>

          <Route path="/login" element={<Login isAuthenticated={auth.isAuthenticated} claim={auth.currentUser.claim} />}></Route>
          <Route path="/en-iyi-oyuncular" element={<BestPlayers />}></Route>


          <Route path="game" element={<Game />}>
            <Route path="normal" element={<NormalMod />}></Route>
            <Route path="zamana-karsi" element={<AgainstTimeMod />}></Route>
            <Route path="sinirli-tiklama" element={<LimitedClickMod />}></Route>
          </Route>






        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;