import React from 'react';






function Wrapper(props) {

    const style = {
        wrapper: {
            margin:'0',
            height: '100vh'
        }
    }

  return (
    <div style={style.wrapper}>
      {props.inside}
    </div>
  )
}

export default Wrapper;
