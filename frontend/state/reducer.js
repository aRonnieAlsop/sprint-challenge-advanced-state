// ❗ You don't need to add extra reducers to achieve MVP

import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'


import { combineReducers } from 'redux'



const initialWheelState = {
  currentPosition: 0,
}

function reducer(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        currentPosition: (state.currentPosition + 1) % 6, 
      }
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        currentPosition: (state.currentPosition + 5) % 6,
      }
    default:
      return state
  }
}

function wheel(state = initialWheelState, action) {
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
