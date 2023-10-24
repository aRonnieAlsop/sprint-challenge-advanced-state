import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { formData, inputChange, postQuiz } = props

  useEffect(() => {
    // Fetch initial form data if not already present in the Redux store
    if (!formData.newQuestion && !formData.newTrueAnswer && !formData.newFalseAnswer) {
      inputChange()
    }
  }, [formData.newQuestion, formData.newTrueAnswer, formData.newFalseAnswer, inputChange])

  const onChange = (evt) => {
    const { id, value } = evt.target
    inputChange({ [id]: value })
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Validate the form data here if needed
    // If valid, dispatch the action to post the new quiz
    postQuiz({
      question_text: formData.newQuestion,
      true_answer_text: formData.newTrueAnswer,
      false_answer_text: formData.newFalseAnswer,
    })
  }

  // Disable submit button if any input is empty
  const isSubmitDisabled = !(formData.newQuestion.trim() && formData.newTrueAnswer.trim() && formData.newFalseAnswer.trim())



  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={formData.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={formData.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={formData.newFalseAnswer} />
      <button type="submit" id="submitNewQuizBtn" disabled={isSubmitDisabled} >
        Submit new quiz
      </button>
    </form>
  )
}

const mapStateToProps = (state) => ({
  formData: state.form,
})

export default connect(mapStateToProps, actionCreators)(Form)
