

import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
            <Link to="/load_character" className="button">Load Character</Link>
            <Link to="/" className="button">Home</Link>
            <Link to="/create_character" className="button">Create Character</Link>
      </div>
      <Outlet />
    </>
  )
};

export default Header;