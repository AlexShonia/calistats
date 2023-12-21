import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { isLoggedIn, name } = useAuth();

  return (
    <>
      <div className="header">
        <button className="button" onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </button>
        {open ? <DropDownMenu setOpen={setOpen} open={open} /> : ""}
        <Link to="/" className="button bigbtn">
          Home
        </Link>
        <div className="nameIcon">
          {isLoggedIn ? name : "Guest"}
          <button className="button">🗿</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

function DropDownMenu({ setOpen, open }) {
  const { logout, isLoggedIn, setIsGuestLoggedOut } = useAuth();
  return (
    <div className="menuDropdown">
      <div>MENU</div>
      <Link
        to="/create_character"
        className="button bigbtn"
        onClick={() => setOpen(!open)}
      >
        Create Character
      </Link>
      <Link
        to="/load_character"
        className="button bigbtn"
        onClick={() => setOpen(!open)}
      >
        Load Character
      </Link>
      <div
        className="button bigbtn"
        onClick={() => {
          logout();
          setOpen(!open);
          if(isLoggedIn){
            setIsGuestLoggedOut(true)
          }
        }}
      >
        Logout
      </div>
    </div>
  );
}

export default Header;
