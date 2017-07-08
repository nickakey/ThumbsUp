import React from 'react';
import LectureStarter from './LectureStarter.jsx';
import LectureCreator from './LectureCreator.jsx';
import LectureButtons from './LectureButtons.jsx';
import ThumbsChecker from './ThumbsChecker.jsx';
import MCQChecker from './MCQChecker.jsx';
import axios from 'axios';

const io = require('socket.io-client');
const socket = io();

class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: '',
      currentOptions: [],
      lectures: null
    };

    socket.on('averageThumbValue', (data) => {
      if (props.view === 'instructor') {

        props.changeThumbValue(data.averageThumbValue);
      }
    });

    socket.on('allAnswersInString', (data) => {
      if (props.view === 'instructor') {
        //console.log('data', data);
        props.changeMCQ(data.allAnswersInString);
      }
    });
    //console.log('this is the q type', this.props.questionType)
  }

  changeQuestion(e) {
    this.setState({
      currentQuestion: e.title,
      currentOptions: [e.answer1, e.answer2, e.answer3, e.answer4]
    });
  }

  componentDidMount(){
    this.getLecturesFromDB();
  }

  getLecturesFromDB(){
    axios({
      method: 'get',
      url: '/lectures',
    }).then((response) => {
      this.setState({lectures: response.data}, ()=>{
        console.log('the state has updated! ', this.state)
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  setQuestions(questionsObject){
    console.log('this is the questions object! ')
  }


  render() {
    return (
      <div>
        {this.props.lectureStatus === 'lectureNotStarted'
          ? <div>
            <div className="col-xs-6 text-center">
              <LectureCreator
              getLecturesFromDB = {this.getLecturesFromDB.bind(this)}
              />
            </div>
            <div className="col-xs-6 text-center">
              <LectureStarter
                lectures={this.state.lectures}
                startLecture={this.props.startLecture}
              />
            </div>
          </div>
          : this.props.lectureStatus === 'lectureStarted'
            ? <LectureButtons
              questions={this.props.questions}
              lectureId={this.props.lectureId}
              startThumbsCheck={this.props.startThumbsCheck}
              startMCQ={this.props.startMCQ}
              endLecture={this.props.endLecture}
              changeQuestion={this.changeQuestion.bind(this)}
            />
            : this.props.questionType === 'thumbs'
              ? <ThumbsChecker
                startLecture={this.props.startLecture}
                lectureId={this.props.lectureId}
                countdown={this.props.countdown}
                thumbValue={this.props.thumbValue}
                clearThumbsCheck={this.props.clearThumbsCheck}
              />
              : <MCQChecker
                MCQAnswer={this.props.MCQAnswer}
                currentQuestion={this.state.currentQuestion}
                currentOptions={this.state.currentOptions}
                startLecture={this.props.startLecture}
                lectureId={this.props.lectureId}
                countdown={this.props.countdown}
                thumbValue={this.props.thumbValue}
                startThumbsCheck={this.props.startThumbsCheck}
                clearThumbsCheck={this.props.clearThumbsCheck}
                submitCount={this.props.submitCount}
              />
        }
      </div>
    );
  }
}

export default Instructor;
