import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
  Skills_btn,
  Stats_btn,
  Delete_exercise_btn,
  Add_exercise_btn,
  Calculate_btn,
} from "./buttons";
import { useAuth } from "../AuthContext";

function Push({ exerciseData, setExerciseData }) {
  const exercises = {
    Pushups: [
      "Pushups",
      "Diamond Pushups",
      "Ring Wide PU",
      "Ring Wide PU",
      "Ring PU",
      "RTO Pushups",
      "RTO Archer PU",
      "RTO 40 deg PPPU",
      "RTO 60 deg PPPU",
    ],
    "One Arm PU": [
      "elevated OA PU",
      "Straddle OA PU",
      "rings str. OA PU",
      "straight bdy OA PU",
      "rings SB OA PU",
    ],
  };
  return (
    <PPL_windows
      exercises={exercises}
      exerciseData={exerciseData}
      setExerciseData={setExerciseData}
    />
  );
}

function Pull() {
  const exercise_progressions = [
    "Select an exercise",
    "Pullups",
    "One arm pullups",
    "Planche",
  ];

  return <PPL_windows exercise_progressions={exercise_progressions} />;
}

function Legs() {
  const exercise_progressions = [
    "Select an exercise",
    "Squats",
    "One leg squats",
    "Lunges",
  ];

  return <PPL_windows exercise_progressions={exercise_progressions} />;
}

function DropDownMenu({
  setOpen,
  exerciseData,
  setExerciseData,
  index,
  exercises,
}) {
  const [activeMenu, setActiveMenu] = useState("main");

  function DropDownItem(props) {
    const handleClick = () => {
      if (props.goToMenu) {
        setActiveMenu(props.goToMenu);
      } else {
        setOpen(-1);
        const updatedExerciseData = exerciseData;
        updatedExerciseData[index].exercise = props.children;
        for (const key in exercises) {
          if (exercises[key].includes(props.children)) {
            updatedExerciseData[index].type = key;
            break;
          }
        }
        setExerciseData(updatedExerciseData);
      }
    };

    return (
      <button className="button" id="ddbutton" onClick={handleClick}>
        {props.children}
      </button>
    );
  }

  return (
    <div id="exerciseDropDown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          {Object.keys(exercises).map((option) => (
            <DropDownItem goToMenu={option} key={option}>
              {option} <div className="open"></div>
            </DropDownItem>
          ))}
        </div>
      </CSSTransition>

      {Object.keys(exercises).map((option) => (
        <CSSTransition
          in={activeMenu === option}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
        >
          <div className="menu exerciseDropdown">
            <DropDownItem goToMenu="main">
              <div className="back"></div> <label>Back</label>
            </DropDownItem>
            {exercises[option].map((option1) => (
              <DropDownItem>{option1}</DropDownItem>
            ))}
          </div>
        </CSSTransition>
      ))}
    </div>
  );
}

function PPL_windows({ exercises, exerciseData, setExerciseData }) {
  const [exercise_key, set_exercise_key] = useState(0);
  const [totalResponse, setTotalResponse] = useState(0);
  const [open, setOpen] = useState(-1);
  const { isLoggedIn, logout, name } = useAuth();

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const updatedExerciseData = [...exerciseData];
    updatedExerciseData[index].reps_seconds = value;

    setExerciseData(updatedExerciseData);
  };

  const handleOpening = (index) => {
    if (open !== -1) {
      setOpen(-1);
    } else {
      setOpen(index);
    }
  };

  return (
    <>
      <div className="ppl_window">
        <div className="ppl_header">
          <div>Exercise</div>
          <div>reps/seconds</div>
          <div id="level">level</div>
        </div>
        {exerciseData?.map((i, index) => (
          <div className="ppl_row" key={i.key}>
            <div id="dropdown">
              <button
                className="button"
                id="ddbutton"
                onClick={() => handleOpening(index)}
              >
                {exerciseData[index].exercise}
                <div></div>
              </button>
              {index == open ? (
                <DropDownMenu
                  setOpen={setOpen}
                  setExerciseData={setExerciseData}
                  exerciseData={exerciseData}
                  index={index}
                  exercises={exercises}
                ></DropDownMenu>
              ) : (
                ""
              )}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="input">
              <input
                value={i.reps_seconds}
                onChange={(e) => {
                  handleInputChange(e, index);
                }}
                type="number"
                min={1}
                max={100}
                step={1}
              ></input>
            </div>
            <div>
              <div id="level">{i.level}</div>
              <Delete_exercise_btn
                exerciseData={exerciseData}
                setExerciseData={setExerciseData}
                index={index}
              />
            </div>
          </div>
        ))}
        <div id="btn_div">
          <div>
            <Add_exercise_btn
              exerciseData={exerciseData}
              setExerciseData={setExerciseData}
              exercise_key={exercise_key}
              set_exercise_key={set_exercise_key}
            />
            <Calculate_btn
              exerciseData={exerciseData}
              setExerciseData={setExerciseData}
              setTotalResponse={setTotalResponse}
            />
          </div>
          <div id="Fifteenvw" />
          <div id="Tenvw" />
        </div>
      </div>
      <div id="total">
        <h3>total</h3>
        <div>{totalResponse}</div>
      </div>
    </>
  );
}

export { Push, Pull, Legs };
