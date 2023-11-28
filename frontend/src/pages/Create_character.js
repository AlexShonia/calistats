import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Create_character = () => {
  const [error, setError] = useState();
  const [loadData, setloadData] = useState({
    name: "",
    password: "",
  });
  const [value, setValue] = useState("");
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
    const inputValue = event.key;

    if (inputValue === "Backspace") {
      console.log("delet");
      setValue(value.slice(0, -1));
      console.log(value);
    } else if (inputValue.length > 1) {
      console.log("not char");
    } else {
      setValue(value + inputValue);
      console.log(value);
      setloadData({
        ...loadData,
        [event.target.name]: value,
      });
    }
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
      <input
        name="password"
        onKeyDown={handleInputChange}
        value={"*".repeat(value.length)}
        placeholder="Assword"
      ></input>
      <div>{error}</div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default Create_character;
