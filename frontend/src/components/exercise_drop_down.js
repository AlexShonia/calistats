function DropDownMenu() {
  return (
    <div className="dropdown">
      <div>MENU</div>
      <Link to="/create_character" className="button bigbtn">
        Create Character
      </Link>
      <Link to="/load_character" className="button bigbtn">
        Load Character
      </Link>
      <div className="button bigbtn" onClick={() => logout()}>
        Logout
      </div>
    </div>
  );
}

export default DropDownMenu;
