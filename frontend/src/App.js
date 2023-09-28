import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


function Stat_page() {
  return(
    <ul>
      <li>yes</li>
    </ul>
  )
}

function Skill_page() {
  return(
    <ul>
      <li>no</li>
    </ul>
  )
}

// let is_stat = true

export default function App() {
  const [is_stat, set_is_stat] = useState(true);
  const [is_front, set_is_front] =useState(true);

  function handleClick(page) {
    if (page === "skills"){
      set_is_stat(false)
    } else {
      set_is_stat(true)
    }
  }

  function handleClick2() {
    set_is_front(!is_front);
  }

  return(
    <>
      <div className="header">
          <button className="sign">Load Character</button>
          <button className="sign">Create Character</button>
      </div>    
      <div className="app">
          <div className="character">
            <button onClick={handleClick2}> {is_front ? "Front" : "Back"} </button>
            {is_front ? <img src="https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/crop-9027665.jpg?w=620"></img>
                       : <img src="https://i.ytimg.com/vi/ncMorsTcUOE/maxresdefault.jpg"></img> }
          </div>
          <div className="stats_about">
            <div className='app_header'>
              <button onClick={() => handleClick("stats")}>Stats</button>
              <button onClick={() => handleClick("skills")}>Skills</button>
            </div>
            {is_stat ? <Stat_page/> : <Skill_page/> }
          </div>
      </div>
    </>
  )
}
