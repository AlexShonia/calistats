import React from "react";

function Stats_btn({ is_stat, set_is_stat }) {
  return (
    <button onClick={() => set_is_stat(true)} className="button app_button">
      {is_stat ? "Stats+" : "Stats"}
    </button>
  );
}
function Skills_btn({ is_stat, set_is_stat }) {
  return (
    <button onClick={() => set_is_stat(false)} className="button app_button">
      {is_stat ? "Skills" : "Skills+"}
    </button>
  );
}

export { Skills_btn, Stats_btn };
