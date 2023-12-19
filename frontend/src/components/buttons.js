import React from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { json } from "react-router-dom";


function Stats_btn({ is_stat, set_is_stat }) {
  return (
    <button onClick={() => set_is_stat(true)} className="button app_button">
      {is_stat ? "Stats+" : "Stats"}
    </button>
  );
}
function Skills_btn({ is_stat, set_is_stat }) {
  return (
    <button onClick={() => set_is_stat(false)} className="button app_button">
      {is_stat ? "Skills" : "Skills+"}
    </button>
  );
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
    });

    setExerciseData(list);
  }

  return (
    <button className="add_exercise" onClick={handle_click}>
      +
    </button>
  );
}

function Calculate_btn({ exerciseData, setTotalResponse }) {
  const { isLoggedIn, logout, name } = useAuth();

  const handleSubmit = async (event) => {
    let filteredData = exerciseData.filter(
      (item) => item.exercise !== "Select an exercise"
    );

    if(!isLoggedIn){
      sessionStorage.setItem("exerciseData", JSON.stringify(filteredData))
      const storedData = sessionStorage.getItem("exerciseData");
      const parsedData = JSON.parse(storedData)
      console.log(parsedData)
    }
    const data = { exerciseData: [...filteredData], isLoggedIn: isLoggedIn };
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

export {
  Skills_btn,
  Stats_btn,
  Delete_exercise_btn,
  Add_exercise_btn,
  Calculate_btn,
};
