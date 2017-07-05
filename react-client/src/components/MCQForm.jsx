import React from 'react';
import axios from 'axios'

class MCQForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionName: '',
      questions: {
        '1': '', 
        '2': '', 
        '3': '',
        '4': ''
      }
    };
  }

  handleChange (form, event) {
    event.persist()
    if(form === 'questionName') {
      this.setState({questionName: event.target.value});
    }
    else {
      this.setState(()=>{
        const newState = this.state;
        newState.questions[form] = event.target.value;
        return newState;
      })
    }
  }

  onQuestionSave() {
    this.props.onQuestionSave();
    //send the data to database

  }

  render () {
    return (
      <div>
        <input
            type="text"
            value={this.state.questionName}
            placeholder="Enter Question Name"
            onChange={this.handleChange.bind(this, 'questionName')}
        />
        <input
            type="text"
            value={this.state.questions[1]}
            placeholder="Question 1"
            onChange={this.handleChange.bind(this, '1')}
        />
        <input
            type="text"
            value={this.state.questions[2]}
            placeholder="Question 2"
            onChange={this.handleChange.bind(this, '2')}
        />
        <input
            type="text"
            value={this.state.questions[3]}
            placeholder="Question 3"
            onChange={this.handleChange.bind(this, '3')}
        />
        <input
            type="text"
            value={this.state.questions[4]}
            placeholder="Question 4"
            onChange={this.handleChange.bind(this, '4')}
        />
        <div
          className="smlbtn btn-sm btn-normal"
          onClick={this.props.onQuestionSave.bind(this)}>
          Save Question
        </div>
      </div>
    )
  }
}

export default MCQForm
