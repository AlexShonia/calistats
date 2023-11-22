import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header">
        <button className="button" onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </button>
        {open ? <DropDownMenu /> : ""}
        <Link to="/" className="button">
          Home
        </Link>
        <div>
          Gali Kunti
          <div>😄</div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

function DropDownMenu() {
  return (
    <div className="dropdown">
      <Link to="/create_character" className="button">
        Create Character
      </Link>
      <Link to="/load_character" className="button">
        Load Character
      </Link>
    </div>
  );
}

export default Header;
