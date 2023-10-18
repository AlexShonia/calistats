import React, {useState} from 'react';
import api from "../api";


const Load_character = () => {
  const [error, setError] = useState({})
  const [loadData, setloadData] = useState({
    name: "",
    password: "",
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/load_character/", loadData);
    setloadData({
      name: "",
      password: "",
    })
    setError(response.data)
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setloadData({
      ...loadData,
      [event.target.name]: value,
    });
  };

    return (
      <div className="authorisation">
        <label>Character name/mail:</label>
        <input name="name" onChange={handleInputChange} value={loadData.name}></input>
        <div>{error.name_test}</div>
        <label>password</label>
        <input name="password" onChange={handleInputChange} value={loadData.password}></input>
        <div>{error.password_test}</div>
        <button onClick={handleSubmit}>Load</button>
      </div>
    )
  };
  
  export default Load_character;