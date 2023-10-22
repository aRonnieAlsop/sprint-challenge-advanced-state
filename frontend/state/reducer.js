// ❗ You don't need to add extra reducers to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER, } from './action-types'


import { combineReducers } from 'redux'



const initialWheelState = {
  currentPosition: 0,
  activeCogIndex: 0,
}

function reducer(state = initialWheelState, action) {
  switch (action.type) {
    case SET_ACTIVE_COG_INDEX:
      return {
        ...state,
        activeCogIndex: action.payload,
      };
      case MOVE_CLOCKWISE:
      return {
        ...state,
        currentPosition: (state.currentPosition + 1) % 6, 
      };
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        currentPosition: (state.currentPosition + 5) % 6,
      };
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload,
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
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default: 
      return state;
  }
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

// export default reducer
export default combineReducers({ wheel, reducer, quiz, selectedAnswer, infoMessage, form })
