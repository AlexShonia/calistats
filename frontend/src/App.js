import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


export default function App() {
  return(
    <>
      <div className="header">
          <button className="sign">Load Character</button>
          <button className="sign">Create Character</button>
      </div>    
      <div className="app">
          <div className="character">
            <button> Front </button>
            <img src="https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/crop-9027665.jpg?w=620"></img>
          </div>
          <div className="stats_about"></div>
      </div>
    </>
  )
}
