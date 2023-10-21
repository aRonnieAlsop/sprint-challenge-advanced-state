import React, { useState } from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {
  const [activeCogIndex, setActiveCogIndex] = useState(0)

  const handleClockwiseClick = () => {
    const newIndex = (activeCogIndex - 1 + 6) % 6
    setActiveCogIndex(newIndex)
    props.moveClockwise()
  }
  
  const handleCounterClockwiseClick = () => {
    const newIndex = (activeCogIndex + 1) % 6
    setActiveCogIndex(newIndex)
    props.moveCounterClockwise()
  }

  return (
    <div id="wrapper">
    <div id="wheel">
      {[0, 1, 2, 3, 4, 5].map(index => (
        <div
          key={index}
          className={`cog ${activeCogIndex === index ? 'active' : ''}`}
          style={{ "--i": index }}
        >
          {activeCogIndex === index && <span>B</span>}
        </div>
      ))}
    </div>
    <div id="keypad">
      <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>
        Counter clockwise
      </button>
      <button id="clockwiseBtn" onClick={handleClockwiseClick}>
        Clockwise
      </button>
    </div>
  </div>

    // <div id="wrapper">
    //   <div id="wheel">
    //     <div className="cog active" style={{ "--i": 0 }}>B</div>
    //     <div className="cog" style={{ "--i": 1 }}></div>
    //     <div className="cog" style={{ "--i": 2 }}></div>
    //     <div className="cog" style={{ "--i": 3 }}></div>
    //     <div className="cog" style={{ "--i": 4 }}></div>
    //     <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
    //   </div>
    //   <div id="keypad">
    //     <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>Counter clockwise</button>
    //     <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
    //   </div>
    // </div>
  )
}

const mapStateToProps = state => ({
  currentPosition: state.wheel.currentPosition,
})

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wheel)