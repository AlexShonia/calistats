import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Create_character = () => {
  const [error, setError] = useState();
  const [loadData, setloadData] = useState({
    name: "",
    password: "",
  });
  const [passType, setPassType] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/register/", loadData);
      setloadData({
        name: "",
        password: "",
      });
      setError("");
      navigate("/load_character");
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
    console.log(loadData.password);
  };

  return (
    <div className="authorisation">
      <div>Register</div>
      <label>Character name or email:</label>
      <input
        name="name"
        onChange={handleInputChange}
        value={loadData.name}
        placeholder="Name"
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
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default Create_character;
