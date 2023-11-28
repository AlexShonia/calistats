import React, { useState, useEffect } from "react";
import api from "../api";

function Skill_wind() {
  const [curWind, setCurWind] = useState("All");
  const windows = ["All Skills", "Push", "Pull", "Legs"];
  return (
    <>
      <div className="skills">
        {windows.map((window, index) => (
          <button
            className={curWind === window ? "clicked" : "button app_button"}
            onClick={() => {
              setCurWind(windows[index]);
            }}
          >
            {windows[index]}
          </button>
        ))}
      </div>
      {curWind == windows[0] ? <All_skills /> : null}
      {curWind == windows[1] ? <Push /> : null}
      {curWind == windows[2] ? <Pull /> : null}
      {curWind == windows[3] ? <Legs /> : null}
    </>
  );
}

function All_skills() {
  return (
    <>
      <ol>
        <li>Front Lever: 10sec</li>
        <li>One arm push-up: 5reps</li>
        <li>One arm pull-up: 1rep</li>
      </ol>
    </>
  );
}

function Push() {
  const exercise_options = [
    "Select an exercise",
    "Pushups",
    "One arm pushups",
    "Planche",
  ];

  return <PPL_windows exercise_options={exercise_options} />;
}

function Pull() {
  const exercise_options = [
    "Select an exercise",
    "Pullups",
    "One arm pullups",
    "Planche",
  ];

  return <PPL_windows exercise_options={exercise_options} />;
}

function Legs() {
  const exercise_options = [
    "Select an exercise",
    "Squats",
    "One leg squats",
    "Lunges",
  ];

  return <PPL_windows exercise_options={exercise_options} />;
}

function Delete_exercise_btn({ index, exerciseData, setExerciseData }) {
  function handle_click() {
    const list = [...exerciseData];
    list.splice(index, 1);
    setExerciseData(list);
  }
  return (
    <button onClick={handle_click} className="delete_exercise">
      x
    </button>
  );
}

function Add_exercise_btn({
  exerciseData,
  setExerciseData,
  exercise_key,
  set_exercise_key,
}) {
  function handle_click() {
    const list = [...exerciseData];
    set_exercise_key(exercise_key + 1);
    list.push({
      exercise: "Select an exercise",
      reps_seconds: 0,
      key: exercise_key,
      level: 0,
    });

    setExerciseData(list);
  }

  return (
    <button className="add_exercise" onClick={handle_click}>
      +
    </button>
  );
}

function Calculate_btn({ exerciseData, setExerciseData, setTotalResponse }) {
  const handleSubmit = async (event) => {
    let filteredData = exerciseData.filter(
      (item) => item.exercise !== "Select an exercise"
    );
    const data = { exerciseData: [...filteredData] };

    const response = await api.post("/calculate/", data);
    setTotalResponse(Math.round(response.data.total_level));

    let updatedExerciseData = exerciseData;
    for (let i = 0; i < updatedExerciseData.length; i++) {
      let exercise = updatedExerciseData[i].exercise;
      for (let j = 0; j < response.data.ind_levels.length; j++) {
        let level = response.data.ind_levels[j][exercise];
        if (level) {
          updatedExerciseData[i].level = level;
        }
      }
    }
  };

  return (
    <button className="button app_button" onClick={handleSubmit}>
      Calculate
    </button>
  );
}

function PPL_windows({ exercise_options }) {
  const [exercise_key, set_exercise_key] = useState(0);
  const [exerciseData, setExerciseData] = useState([]);
  const [totalResponse, setTotalResponse] = useState(0);

  const handleExerciseChange = (event, index) => {
    const value = event.target.value;
    const updatedExerciseData = exerciseData;

    let isValid = true;
    for (let i = 0; i < updatedExerciseData.length; i++) {
      if (
        updatedExerciseData[i] &&
        value == updatedExerciseData[i].exercise &&
        value != "Select an exercise"
      ) {
        updatedExerciseData[index].exercise = "Select an exercise";
        isValid = false;
      }
    }

    if (isValid) {
      updatedExerciseData[index].exercise = event.target.value;
      setExerciseData(updatedExerciseData);
    }
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const updatedExerciseData = [...exerciseData];
    updatedExerciseData[index].reps_seconds = value;

    setExerciseData(updatedExerciseData);
  };

  function handleIncrease(e, index) {
    let updatedExerciseData = [...exerciseData];
    updatedExerciseData[index].reps_seconds++;
    setExerciseData(updatedExerciseData);
  }

  function handleDecrease(e, index) {
    let updatedExerciseData = [...exerciseData];
    updatedExerciseData[index].reps_seconds--;
    setExerciseData(updatedExerciseData);
  }

  return (
    <>
      <div className="ppl_window">
        <div className="ppl_header">
          <div>Exercise</div>
          <div>reps/seconds</div>
          <div id="level">level</div>
        </div>
        {exerciseData.map((i, index) => (
          <div className="ppl_row" key={i.key}>
            <select
              onChange={(e) => {
                handleExerciseChange(e, index);
              }}
              name="exercise"
            >
              {exercise_options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div className="input">
              <input
                value={i.reps_seconds}
                onChange={(e) => {
                  handleInputChange(e, index);
                }}
              ></input>
              <div className="increse_decrease">
                <button
                  onClick={(e) => {
                    handleIncrease(e, index);
                  }}
                >
                  <div className="increase"></div>
                </button>
                <button
                  onClick={(e) => {
                    handleDecrease(e, index);
                  }}
                >
                  <div className="decrease"></div>
                </button>
              </div>
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

export default Skill_wind;
