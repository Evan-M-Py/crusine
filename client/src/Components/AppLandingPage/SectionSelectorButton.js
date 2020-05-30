import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';




const SectionSelectorButton = (props) => {

  const style = {
    text: {
      display:'flex',
      justifyContent: "center",
          alignItems: "center"
    }
  }

  return (
    <div style={style.text}>
      <img src={props.buttonImg} style={props.style} onClick={props.select}></img>
    </div>
  )
}

export default SectionSelectorButton;
