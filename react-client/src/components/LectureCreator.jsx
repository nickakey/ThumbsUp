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
      lectureID: 5,
      tempQuestionName: '',
      questionNames: [],
      questionName: '',
      answers: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
      }
    };
  }

  onLectureSave() {
    if (this.state.showInput) {
      this.setState({ showInput: false, showAskForMCQ: true });
        axios({
          method: 'post',
          url: '/lecture',
          params: {
            name: this.state.name
          }
        })
        .then((res)=>{
          this.props.setLectureId(res.data.lectureId);
          this.props.getLecturesFromDB();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ showInput: true, showAskForMCQ: false, questionNames: [], name: '' });
    }
  }


  onMCQAdd() {
    this.setState({ showMCQForm: true, showAskForMCQ: false });
  }

  onQuestionSave() {
    axios({
      method: 'post',
      url: '/questionsAnswers',
      params: {
        options: {
          lectureID: this.state.lectureID,
          question: this.state.tempQuestionName,
          answer1: this.state.answers[1],
          answer2: this.state.answers[2],
          answer3: this.state.answers[3],
          answer4: this.state.answers[4]
        }
      }
    })
    .then((res)=>{
      //res.data.insertId is the question ID if we ever need it!
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState(() => {
      const newState = this.state;
      newState.showMCQForm = false;
      newState.showAddAnotherMCQ = true;
      newState.questionNames.push(this.state.tempQuestionName);
      return newState;
    });
    this.setState({
      answers: {
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
        newState.answers[form] = event.target.value;
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
                    <MCQForm answers={this.state.answers} onQuestionSave={this.onQuestionSave.bind(this)} handleChange={this.handleChange.bind(this)} />
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

