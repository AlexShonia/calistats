import React, { useState, useEffect } from "react";
import api from "../api";

import { Push, Pull, Legs } from "./ppl_windows";
import { useAuth } from "../AuthContext";

function Skill_wind() {
  const [curWind, setCurWind] = useState("All");
  const windows = ["All Skills", "Push", "Pull", "Legs"];
  const [response, setResponse] = useState();
  const {
    isLoggedIn,
    logout,
    name,
    mail,
    isGuestLoggedOut,
    setIsGuestLoggedOut,
  } = useAuth();
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    if (isGuestLoggedOut) {
      setExerciseData([]);
      setIsGuestLoggedOut(false);
      setResponse({ exerciseData: [] });
    }
  }, [isGuestLoggedOut]);

  const handleClick = async (index) => {
    setCurWind(windows[index]);
    if (isLoggedIn) {
      const rsp = await api.get(`/loadExercises/?email=${mail}`);
      setExerciseData(rsp.data.exerciseData);
    } else {
      const storedData = sessionStorage.getItem("exerciseData");
      const parsedData = JSON.parse(storedData) || [];
      setExerciseData(parsedData);
      setResponse({ exerciseData: parsedData });
    }
  };

  return (
    <>
      <div className="skills">
        {windows.map((window, index) => (
          <button
            className={curWind === window ? "clicked" : "button app_button"}
            onClick={() => {
              handleClick(index);
            }}
          >
            {windows[index]}
          </button>
        ))}
      </div>
      {curWind == windows[0] ? <All_skills /> : null}
      {curWind == windows[1] ? (
        <Push exerciseData={exerciseData} setExerciseData={setExerciseData} />
      ) : null}
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

export default Skill_wind;
