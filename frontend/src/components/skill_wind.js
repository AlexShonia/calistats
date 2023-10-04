import React, {useState} from 'react';

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
    const exercise_options = ["Pushups", "One arm pushups", "Planche"];

    return(
    <PPL_picker exercise_options={exercise_options}/>);
    }

function Pull() {
    const exercise_options = ["Pullups", "One arm pullups", "Planche"];

    return<PPL_picker exercise_options={exercise_options}/>;
    }

function Legs() {
    const exercise_options = ["Squats", "One leg squats", "Lunges"];

    return <PPL_picker exercise_options={exercise_options}/>;
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
    
    function Delete_exercise_btn({exercise_count, set_exercise_count, index}) {
    function handle_click() {
        const list = [...exercise_count]
        list.splice(index, 1)
        set_exercise_count(list)
    }
    return (
        <button onClick={handle_click} className='delete_exercise'>x</button>
    )
    }
    
function PPL_picker({ exercise_options}) {
  const [exercise_count, set_exercise_count] = useState([])
  const [exercise_key, set_exercise_key] = useState(0)

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
            <select>
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
               />
            </div>
          </div>
        ))}
      <div id="btn_div">
        <Add_exercise_btn
         exercise_count={exercise_count} set_exercise_count={set_exercise_count}
         exercise_key={exercise_key} set_exercise_key={set_exercise_key}
         />
      </div>
    </div>  
    <div id='total'>
      <h3>total</h3>
      <div>69</div>
    </div>
    </>
  )
}

export default Skill_wind;