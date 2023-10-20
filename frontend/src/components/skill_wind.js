import React, {useState} from 'react';
import api from "../api";

function Skill_wind() {
    const [curWind, setCurWind] = useState("All")
    const windows = ["All Skills", "Push", "Pull", "Legs"]
    return(
        <>
        <div  className="skills">
          {windows.map((i, index) => (
            <button onClick={() => {setCurWind(windows[index])}}>{windows[index]}</button>
          ))}
        </div>
        {curWind == windows[0] ? <All_skills/> : null}
        {curWind == windows[1] ? <Push/> : null}
        {curWind == windows[2] ? <Pull/> : null}
        {curWind == windows[3] ? <Legs/> : null}
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
    const exercise_options = ["Select an exercise", "Pushups", "One arm pushups", "Planche"];

    return(
    <PPL_windows exercise_options={exercise_options}/>);
    }

function Pull() {
    const exercise_options = ["Select an exercise", "Pullups", "One arm pullups", "Planche"];

    return<PPL_windows exercise_options={exercise_options}/>;
    }

function Legs() {
    const exercise_options = ["Select an exercise", "Squats", "One leg squats", "Lunges"];

    return <PPL_windows exercise_options={exercise_options}/>;
    }

function Delete_exercise_btn({exercise_count, set_exercise_count, index,exerciseData, setExerciseData}) {
  function handle_click() {
        const list = [...exercise_count]
        list.splice(index, 1)
        set_exercise_count(list)

        const data = exerciseData
        data.splice(index, 1)
        setExerciseData(data)
    } 
    return (
        <button onClick={handle_click} className='delete_exercise'>x</button>
    )
    }

function Add_exercise_btn({exercise_count, set_exercise_count, exercise_key, set_exercise_key}) {
  function handle_click() {
      const list = [...exercise_count]
      set_exercise_key(exercise_key + 1)
      list.push(exercise_key)
      set_exercise_count(list)
  }
  return (
      <button className='add_exercise' onClick={handle_click}>+</button>
  )
}

function Calculate_btn({exerciseData, setTotalResponse}){
  const handleSubmit = async (event) => {
    const data = {"exerciseData": [...exerciseData]}
    for(let i =0; i < data.exerciseData.length; i++){
      console.log(data.exerciseData[i].exercise)
    }
    const response = await api.post("/", data);
    setTotalResponse(Math.round(response.data.level))
  };

  return(
    <button className='calculate_btn' onClick={handleSubmit}>Calculate</button>
  )
}
      
    
function PPL_windows({ exercise_options}) {
  const [exercise_count, set_exercise_count] = useState([])
  const [exercise_key, set_exercise_key] = useState(0)
  const [exerciseData, setExerciseData] = useState([{
    exercise: "",
    reps_seconds: "",
    key : 0,
  }])
  const [totalResponse, setTotalResponse] = useState(0)

  const handleExerciseChange = (event, index) => {
    const value = event.target.value
    const updatedExerciseData = [...exerciseData]
    
    let isValid = true
    for(let i =0; i < updatedExerciseData.length; i++){
      if(updatedExerciseData[i] && value == updatedExerciseData[i].exercise){
        isValid = false
    }}

    if(value == "Select an exercise"){
      updatedExerciseData.splice(index, 1)
      let count = exercise_count
      count.splice(index, 1)
      set_exercise_count(count)
      console.log(index)
      console.log(exercise_count)
      isValid = false
    }

    if(isValid){
      updatedExerciseData[index] = {
        exercise: event.target.value,
        reps_seconds: "",
      }
      
      setExerciseData(
        updatedExerciseData
      );
    }
    console.log(updatedExerciseData)


  }
  return(
    <>
      <div className='ppl_window'>
        <div className='ppl_header'>
          <div>Exercise</div>
          <div>reps/seconds</div>
          <div id='level'>level</div>
        </div>
        {exercise_count.map((i, index) => (
        <div className='ppl_row' key={i}>
          <select 
          onChange={(e) => {handleExerciseChange(e, index)}}
          name="exercise"
          >
          {exercise_options.map((option) => (
            <option key={option}>{option}</option>
          ))}
          </select>
          <input></input>
          <div>
            <div>{i}</div>
            <Delete_exercise_btn 
              exercise_count={exercise_count} set_exercise_count={set_exercise_count}
              index={index}
              setExerciseData={setExerciseData}
              exerciseData={exerciseData}
              />
          </div>
        </div>
        ))}
      <div id="btn_div">
        <Add_exercise_btn
         exercise_count={exercise_count} set_exercise_count={set_exercise_count}
         exercise_key={exercise_key} set_exercise_key={set_exercise_key}
         />
        <Calculate_btn 
        exerciseData={exerciseData} 
        setTotalResponse={setTotalResponse}/>
      </div>
    </div>  
    <div id='total'>
      <h3>total</h3>
      <div>{totalResponse}</div>
    </div>
    </>
  )
}

export default Skill_wind;