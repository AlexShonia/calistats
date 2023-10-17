import api from "../api";
import React, {useState} from 'react';


const Load_character = () => {
  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/load_character/", formData);
    setFormData({
      name: "",
      password: "",
    })
    setError(response.data)
    console.log(response.data)
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

    return (
      <div className="authorisation">
        <label>Character name/mail:</label>
        <input name="name" onChange={handleInputChange} value={formData.name}></input>
        <div>{error.name_test}</div>
        <label>password</label>
        <input name="password" onChange={handleInputChange} value={formData.password}></input>
        <div>{error.password_test}</div>
        <button onClick={handleSubmit}>Load</button>
      </div>
    )
  };
  
  export default Load_character;