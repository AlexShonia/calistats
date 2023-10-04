import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route} from "react-router-dom";

import Skill_wind from "./components/skill_wind";
import Stat_wind from './components/stats_wind';
import {Stats_btn, Skills_btn} from './components/app_side';
import Front_back_btn from './components/character_side';

export default function App() {
  const [is_stat, set_is_stat] = useState(true);
  const [is_front, set_is_front] =useState(true);


  return(
    <>
      {/* <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path='create_character' element={<crate_character/>}/>

          </Route>
        </Routes>
      </BrowserRouter> */}
      <div className="header">
          <button>Load Character</button>
          <button to="/Create_Char">Create Character</button>
      </div>    
      <div className="app">
          <div className="character">
            <Front_back_btn is_front={is_front} set_is_front={set_is_front}/>
          </div>
          <div className="stats_about">
            <div className='app_header'>
              <Stats_btn is_stat={is_stat} set_is_stat={set_is_stat}/>
              <Skills_btn is_stat={is_stat} set_is_stat={set_is_stat}/>
            </div>
            {is_stat ? <Stat_wind/> : <Skill_wind/>}
          </div>
      </div>
    </>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);