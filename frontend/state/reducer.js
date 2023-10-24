// ❗ You don't need to add extra reducers to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  SET_ANSWER,
  SET_QUIZ,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  POST_QUIZ_FAILURE,
  POST_QUIZ_SUCCESS,
  POST_QUIZ_REQUEST,  } from './action-types'


import { combineReducers } from 'redux'

const initalState = {
  quiz: null,
  selectedAnswerIndex: 0,
}

const initialWheelState = {
  currentPosition: 0,
  activeCogIndex: 0,
}

function quizReducer(state = initalState, action) {
  switch (action.type) {
    case SET_ANSWER:
      return {
        ...state,
        selectedAnswerIndex: action.payload,
      };
    default:
      return state
  }
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
    case SET_QUIZ: 
      return {
        ...state,
        quiz: action.payload,
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
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default: 
      return state;
}
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        ...action.payload
      }
    case POST_QUIZ_REQUEST:
      return {
        ...state,
        isPosting: true,
        postQuizError: null,
      }
    case POST_QUIZ_SUCCESS:
      return {
        ...state,
        isPosting: false,
      }
    case POST_QUIZ_FAILURE:
      return {
        ...state,
        isPosting: false,
        postQuizError: action.payload,
      }
      default:
        return state
  }
}

// export default reducer
export default combineReducers({ wheel, reducer, quiz, quizReducer, selectedAnswer, infoMessage, form })
