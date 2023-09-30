import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


function Front_back_button({is_front, set_is_front}) {
  return(
    <>
      <button onClick={() => set_is_front(!is_front)}>
        {is_front ? "Front" : "Back"}
      </button>
      {is_front ?
                <img src="https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/crop-9027665.jpg?w=620"/>
                : 
                <img src="https://i.ytimg.com/vi/ncMorsTcUOE/maxresdefault.jpg"/> }
    </>
  )
}

function Stats_button({is_stat, set_is_stat}) {
  return (
    <button onClick={() => set_is_stat(true)}>
      {is_stat ? "Stats+" : "Stats"}
    </button>
  )
}

function Skills_button({is_stat, set_is_stat}) {
  return (
    <button onClick={() => set_is_stat(false)}>
      {is_stat ? "Skills" : "Skills+"}
    </button>
  )
}

function Stat_wind() {
  return(
    <div className='stats'>
      <div>STR: 45</div>
      <div className='ppl'>
        <div>Push: 69</div>
        <div>Pull: 54</div>
        <div>Legs: 13</div>
      </div>
    </div>
  )
}

function Skill_wind() {
  const [is_all, set_is_all] = useState(true);
  const [is_push, set_is_push] = useState(false);
  const [is_pull, set_is_pull] = useState(false);
  const [is_legs, set_is_legs] = useState(false);
  return(
    <>
      <div  className="skills">
        <button onClick={() => {set_is_all(true); set_is_push(false); set_is_pull(false); set_is_legs(false);}}>All Skills</button>
        <button onClick={() => {set_is_push(true); set_is_all(false); set_is_pull(false); set_is_legs(false);}}>Push</button>
        <button onClick={() => {set_is_pull(true); set_is_all(false); set_is_push(false); set_is_legs(false);}}>Pull</button>
        <button onClick={() => {set_is_legs(true); set_is_all(false); set_is_push(false); set_is_pull(false);}}>Legs</button>
      </div>
      {is_all ? <All_skills/> : null}
      {is_push ? <Push/> : null}
      {is_pull ? <Pull/> : null}
      {is_legs ? <Legs/> : null}
    </>

    )
}


function All_skills() {
  return(
    <>
      <ol>
        <li>Front Lever: 10sec</li>
        <li>One arm push-up: 5reps</li>
        <li>One arm pull-up: 1rep</li>
      </ol>
    </>
  )
}

function Push() {
  return(
    <>
      <div className='ppl_header'>
        <div>Exercise</div> <div>reps/seconds</div>
      </div>
      <div className='ppl_picker'>
        <select>
          <option>Pushups</option>
          <option>one arm pushups</option>
          <option>planche</option>
        </select>
        <input></input>
      </div>
    </>
  )
}

function Pull() {
  return(
    <>
      <div className='ppl_header'>
        <div>Exercise</div> <div>reps/seconds</div>
      </div>
      <div className='ppl_picker'>
        <select>
          <option>Pullups</option>
          <option>one arm pushups</option>
          <option>planche</option>
        </select>
        <input></input>
      </div>
    </>
  )
}

function Legs() {
  return(
    <>
      <div className='ppl_header'>
        <div>Exercise</div> <div>reps/seconds</div>
      </div>
      <div className='ppl_picker'>
        <select>
          <option>Squats</option>
          <option>one arm pushups</option>
          <option>planche</option>
        </select>
        <input></input>
      </div>
    </>
  )
}




export default function App() {
  const [is_stat, set_is_stat] = useState(true);
  const [is_front, set_is_front] =useState(true);

  return(
    <>
      <div className="header">
          <button>Load Character</button>
          <button>Create Character</button>
      </div>    
      <div className="app">
          <div className="character">
            <Front_back_button is_front={is_front} set_is_front={set_is_front}/>
          </div>
          <div className="stats_about">
            <div className='app_header'>
              <Stats_button is_stat={is_stat} set_is_stat={set_is_stat}/>
              <Skills_button is_stat={is_stat} set_is_stat={set_is_stat}/>
            </div>
            {is_stat ? <Stat_wind/> : <Skill_wind/>}
          </div>
      </div>
    </>
  )
}
