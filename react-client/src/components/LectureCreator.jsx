import React from 'react';
import axios from 'axios';
import MCQForm from './MCQForm.jsx';

class LectureCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      showInput: true,
      showAskForMCQ: false,
      showMCQForm: false,
      showAddAnotherMCQ: false,
      tempQuestionName: '',
      questionNames: [],
      questionName: '',
      questions: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
      }
    };
  }

  onLectureSave() {
    if (this.state.questionNames.length) {
      this.setState({ showInput: true, showAskForMCQ: false, questionNames: [], name: '' });
    } else {
      this.setState({ showInput: false, showAskForMCQ: true });
    }

    // 1. Save the lecture to DB
    // 2a. Remove input box
    // 2b. Add button that asks if you would like to add multiple choice question

    // 3. if yes, display title form
    // 4. reset to create new lecture field 
  }


  onMCQAdd() {
    this.setState({ showMCQForm: true, showAskForMCQ: false });
  }

  onQuestionSave(arg1) {
    //save the questions to the database
    //AND will hide the questions element, and show the confirm question
    this.setState(() => {
      const newState = this.state;
      newState.showMCQForm = false;
      newState.showAddAnotherMCQ = true;
      newState.questionNames.push(this.state.tempQuestionName);
      return newState;
    });
    this.setState({
      questions: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
      }
    });
  }

  handleChange(form, event) {
    // console.log(event)
    event.persist();
    if (form === 'questionName') {
      this.setState({ tempQuestionName: event.target.value });
    } else {
      this.setState(() => {
        const newState = this.state;
        newState.questions[form] = event.target.value;
        return newState;
      });
    }
  }

  lectureHandleChange(event) {
    event.persist();
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <div>CREATE NEW LECTURE</div>
          {
            this.state.showInput === true
              ? <input
                type="text"
                className="form-control"
                value={this.state.name}
                placeholder="Enter lecture name"
                onChange={this.lectureHandleChange.bind(this)}
              />
              : this.state.showAskForMCQ === true
                ? <div
                  className="btn btn-success"
                  onClick={this.onMCQAdd.bind(this)}>
                  Add an MCQ
            </div>
                : this.state.showMCQForm === true
                  ? <div>
                    <MCQForm questions={this.state.questions} onQuestionSave={this.onQuestionSave.bind(this)} handleChange={this.handleChange.bind(this)} />
                  </div>
                  : this.state.showAddAnotherMCQ === true
                    ? <div>
                      {this.state.questionNames.map((el, i) => {
                        return <div className="saved-question" key={i}> saved question: {el} </div>;
                      })}
                      <div
                        className="btn btn-sm btn-normal add-another"
                        onClick={this.onMCQAdd.bind(this)}>
                        Add another multiple choice question
              </div>
                    </div>
                    : <div></div>
          }
        </div>
        <div className="col-xs-12 center">
          <div
            className="center btn btn-left"
            onClick={this.onLectureSave.bind(this)}>
            Save Lecture
          </div>
        </div>
      </div>
    );
  }
}

export default LectureCreator;
