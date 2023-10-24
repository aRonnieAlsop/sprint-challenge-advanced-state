import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const [formData, setFormData] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  });

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault()
    const payload = {
      question_text: formData.newQuestion,
      true_answer_text: formData.newTrueAnswer,
      false_answer_text: formData.newFalseAnswer,
    }
    props.postQuiz(payload)
      .then((quiz) => {
        props.setInfoMessage(`Congrats: "${quiz.question_text}" is a great question!`)
      })
      .catch((error) => {
        console.log('Error Setting New Quiz:', error.message)
      })
   
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button type="submit" id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  );
}

export default connect(null, actionCreators)(Form);

