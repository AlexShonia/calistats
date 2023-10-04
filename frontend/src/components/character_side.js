import React from 'react';

function Front_back_btn({is_front, set_is_front}) {
    return(
      <>
        <button onClick={() => set_is_front(!is_front)}>
          {is_front ? "Front" : "Back"}
        </button>
        {is_front ?
                  <img src="https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/crop-9027665.jpg?w=620"/>
                  : 
                  <img src="https://i.ytimg.com/vi/ncMorsTcUOE/maxresdefault.jpg"/> }
      </>
    )
  }

export default Front_back_btn;