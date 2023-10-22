// import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";

// const HeaderStyled = styled.div`
//   background-color: aqua;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 10vh;
// `;
const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/load_character" className="button">
          Load Character
        </Link>
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/create_character" className="button">
          Create Character
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
