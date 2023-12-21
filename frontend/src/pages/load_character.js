import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import api from "../api";

const Load_character = () => {
  const [error, setError] = useState();
  const [loadData, setloadData] = useState({
    email: "",
    password: "",
  });
  const [passType, setPassType] = useState(true);

  const navigate = useNavigate();
  const { login, changeMail, changeName } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login/", loadData);
      setloadData({
        email: "",
        password: "",
      });
      login();
      changeMail(loadData.email);
      
      changeName(response.data.detail);
      navigate("/");
    } catch (error) {
      setError(error.response.data.detail);
    }
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
      <div>Login</div>
      <label>Character email:</label>
      <input
        name="email"
        onChange={handleInputChange}
        value={loadData.email}
        placeholder="Email"
      ></input>
      <label>Password</label>
      <div id="inputbutton">
        <input
          name="password"
          onChange={handleInputChange}
          value={loadData.password}
          placeholder="Assword"
          type={passType ? "password" : "text"}
        ></input>
        <button
          onClick={() => setPassType(!passType)}
          id={passType ? "hidden" : "shown"}
          className="button"
        ></button>
      </div>

      <div>{error}</div>
      <button onClick={handleSubmit}>Load</button>
    </div>
  );
};

export default Load_character;
