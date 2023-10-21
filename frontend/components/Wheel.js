import React, { useState } from 'react'
import { connect } from 'react-redux'
import { moveClockwise, 
  moveCounterClockwise,
  setActiveCogIndex } from '../state/action-creators'

function Wheel(props) {


  const handleClockwiseClick = () => {
    const newIndex = (props.activeCogIndex - 1 + 6) % 6
    props.setActiveCogIndex(newIndex)
    props.moveClockwise()
  }
  
  const handleCounterClockwiseClick = () => {
    const newIndex = (props.activeCogIndex + 1) % 6
    props.setActiveCogIndex(newIndex)
    props.moveCounterClockwise()
  }

  return (
    <div id="wrapper">
    <div id="wheel">
      {[0, 1, 2, 3, 4, 5].map(index => (
        <div
          key={index}
          className={`cog ${props.activeCogIndex === index ? 'active' : ''}`}
          style={{ "--i": index }}
        >
          {props.activeCogIndex === index && <span>B</span>}
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
  )
}

const mapStateToProps = state => ({
  activeCogIndex: state.reducer.activeCogIndex,
  currentPosition: state.reducer.currentPosition,
})

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
  setActiveCogIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wheel)