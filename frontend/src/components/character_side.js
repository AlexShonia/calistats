import React from "react";

function Front_back_btn({ is_front, set_is_front }) {
  return (
    <>
      <button onClick={() => set_is_front(!is_front)} className="button app_button">
        {is_front ? "Front" : "Back"}
      </button>
      {is_front ? (
        <img src="/images/forward.jpg" />
      ) : (
        <img src="/images/back.jpg" />
      )}
    </>
  );
}

export default Front_back_btn;
