// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  } from './action-types'

export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE,
  }
}

export function moveCounterClockwise() { 
  return {
    type: MOVE_COUNTERCLOCKWISE,
  }
}

export function setActiveCogIndex(index) {
  return {
    type: SET_ACTIVE_COG_INDEX,
    payload: index,
  }
}

export function setSelectedAnswer() {
}

export function selectAnswer() { }

export function setInfoMessage() { 
 
}

export function setQuiz(quizData) { 
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quizData,
  }
 }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {

}
export function postAnswer() {
 
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
 
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
