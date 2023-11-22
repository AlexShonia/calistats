import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Create_character = () => {
  const [error, setError] = useState();
  const [loadData, setloadData] = useState({
    name: "",
    password: "",
  });
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
  };

  return (
    <div className="authorisation">
      <label>Character name/mail:</label>
      <input
        name="name"
        onChange={handleInputChange}
        value={loadData.name}
      ></input>
      <label>Password</label>
      <input
        name="password"
        onChange={handleInputChange}
        value={loadData.password}
      ></input>
      <div>{error}</div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default Create_character;
