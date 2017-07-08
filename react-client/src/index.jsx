import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Student from './components/Student.jsx';
import Instructor from './components/Instructor.jsx';
import LectuteButtons from './components/LectureButtons.jsx';
import axios from 'axios';

const io = require('socket.io-client');
const socket = io();

var countdownInterval;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      tokenId: '',
      lectureStatus: 'lectureNotStarted',
      lectureId: '',
      questionId: '',
      thumbValue: 2,
      countdown: 45,
      givenName: '',
      lectureName: '',
      questionType: '',
      MCQAnswer: '',
      submitCount: 0,
      questions: [
        {
          title: 'What is Nick\'s favorite food?',
          answer1: 'Gus\'s Chicken Tenders',
          answer2: 'Chicken Parmesian',
          answer3: 'Gnochi with red sauce',
          answer4: 'Grilled Cheese',
          correctAnswer: 1
        },
        {
          title: 'What is Jake\'s favorite food?',
          answer1: 'Salmon',
          answer2: 'Steak',
          answer3: 'Boston Cream Pie',
          answer4: 'Mousse',
          correctAnswer: 1
        },
        {
          title: 'What is the best pie?',
          answer1: 'Apple',
          answer2: 'Cherry',
          answer3: 'Key Lime',
          answer4: 'Sweet potato',
          correctAnswer: 1
        }
      ],
    };

  }

  componentDidMount() {
    this.setState({ view: 'login' });
  }

  onSignIn(googleUser) {
    let tokenId = googleUser.tokenId;
    axios({
      method: 'get',
      url: '/login',
      params: {
        tokenId: tokenId
      }
    })
      .then(result => {
        if (result.data[0].user_type === 'STUDENT') {
          this.setState({ view: 'student' });
        } else if (result.data[0].user_type === 'INSTRUCTOR') {
          this.setState({ view: 'instructor' });
        }
        this.setState({ givenName: googleUser.profileObj.givenName });
        socket.emit('username', { username: googleUser.profileObj.email });
        if (result.data[0].user_type === 'INSTRUCTOR') {
          socket.emit('instructor', { username: googleUser.profileObj.email });
        }
      });

  }

  startLecture(lectureName) {
    axios({
      method: 'get',
      url: '/questionsByLectureName',
      params: {
        lectureName: lectureName
      }
    }).then((result) => {
      console.log('this is the result from clicking a lecture!!! ', result)
      this.setState({
        questions: null
      })
      if(result.data.length > 0){
        this.setState({
          questions: result.data
        })
      }
      this.setState({
        lectureStatus: 'lectureStarted',
        lectureName: lectureName
      });
    });


    // axios({
    //   method: 'get',
    //   url: '/questions',
    //   params: {
    //     lectureId: lectureId
    //   }
    // }).then((result) => {
    //   console.log('this is the result from clicking a lecture!!! ', result)
    //   this.setState({
    //     lectureStatus: 'lectureStarted',
    //     lectureId: lectureId,
    //     lectureName: lectureName
    //   });
    // });

  }

  setLectureId(id){
    this.setState({lectureId: id})
  }

  endLecture() {
    let lectureId = this.state.lectureId;
    console.log(lectureId);
    axios({
      method: 'post',
      url: '/endLecture',
      params: {
        lectureId: lectureId
      }
    }).then((result) => {
      this.setState({
        lectureStatus: 'lectureNotStarted',
        lectureId: ''
      });
    });
  }

  endLectureStudent() {
    this.setState({
      lectureStatus: 'lectureNotStarted'
    });
  }

  setCountdownInterval() {
    countdownInterval = setInterval(() => {
      this.state.countdown === 0

        ? this.clearCountdownInterval()
        : this.setState({ countdown: this.state.countdown - 1 }, () => {
          //console.log('this.state.countdown', this.state.countdown);
          if (this.state.view === 'student') {
            socket.emit('thumbValue', { thumbValue: this.state.thumbValue });
          }
        });
    }, 1000);
  }


  setCountdownIntervalMCQ() {
    countdownInterval = setInterval(() => {
      this.state.countdown === 0
        ? this.clearCountdownInterval()
        : this.setState({ countdown: this.state.countdown - 1 }, () => {
          //console.log('this.state.countdown', this.state.countdown);
          if (this.state.view === 'student') {
            socket.emit('MCQAnswer', { MCQAnswer: this.state.MCQAnswer });
          }
        });
    }, 1000);
  }

  clearCountdownInterval() {

    clearInterval(countdownInterval);
    if (this.state.view === 'student') {
      this.setState({
        lectureStatus: 'lectureStarted',
        questionId: '',
        countdown: 30
      });
    }
  }

  startThumbsCheck(questionId) {
    this.setState({
      lectureStatus: 'checkingThumbs',
      questionType: 'thumbs',
      questionId: questionId
    }, this.setCountdownInterval);
  }

  endThumbsCheck() {
    this.setState({
      lectureStatus: 'lectureStarted',
      questionId: ''
    });
  }

  clearThumbsCheck() {
    this.setState({
      lectureStatus: 'lectureStarted',
      questionId: '',
      countdown: 30
    });
  }

  changeThumbValue(value) {
    this.setState({
      thumbValue: value
    });
  }
  changeMCQ(value) {
    this.setState({
      MCQAnswer: value
    });
  }



  startMCQ(questionId) {
    this.setState({

      lectureStatus: 'posingMCQ',
      questionType: 'mcq',

      questionId: questionId
    }, this.setCountdownInterval);
  }

  endMCQ() {
    this.setState({
      lectureStatus: 'lectureStarted',
      questionId: ''
    });
  }


  sendAnswer(value) {
    this.setState({
      submitCount: 1,
      MCQAnswer: value
    }, () => {
      if (this.state.view === 'student') {
        socket.emit('MCQAnswer', { MCQAnswer: this.state.MCQAnswer });
      }
    });
  }
  //console.log('sendAnswer got called' )




  clearMCQ() {
    this.setState({
      lectureStatus: 'lectureStarted',
      questionId: '',
      countdown: 30
    });
  }


  changeMCQ(value) {
    this.setState({
      thumbValue: value
    });
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                &nbsp; ThumbsCheck
              </a>
            </div>
          </div>
        </nav>

        <div className="container-fluid main">

          {this.state.view === 'login'
            ? <Login
              onSignIn={this.onSignIn.bind(this)}
            />
            : this.state.view === 'student'
              ? <Student
                thumbValue={this.state.thumbValue}
                MCQAnswer={this.state.MCQAnswer}
                changeThumbValue={this.changeThumbValue.bind(this)}
                startThumbsCheck={this.startThumbsCheck.bind(this)}
                startLecture={this.startLecture.bind(this)}
                lectureStatus={this.state.lectureStatus}
                countdown={this.state.countdown}
                view={this.state.view}
                endLectureStudent={this.endLectureStudent.bind(this)}
                givenName={this.state.givenName}
                lectureName={this.state.lectureName}
                questionType={this.state.questionType}
                sendAnswer={this.sendAnswer.bind(this)}
                startMCQ={this.startMCQ.bind(this)}
              />
              : <Instructor
                questions={this.state.questions}
                setLectureId={this.state.setLectureId}
                thumbValue={this.state.thumbValue}
                lectureId={this.state.lectureId}
                lectureStatus={this.state.lectureStatus}
                startLecture={this.startLecture.bind(this)}
                endLecture={this.endLecture.bind(this)}
                startThumbsCheck={this.startThumbsCheck.bind(this)}
                startMCQ={this.startMCQ.bind(this)}
                countdown={this.state.countdown}
                changeThumbValue={this.changeThumbValue.bind(this)}
                changeMCQ={this.changeMCQ.bind(this)}
                clearThumbsCheck={this.clearThumbsCheck.bind(this)}
                view={this.state.view}
                givenName={this.state.givenName}
                lectureName={this.state.lectureName}
                questionType={this.state.questionType}
                submitCount={this.state.submitCount}
                MCQAnswer={this.state.MCQAnswer}
              />
          }

        </div>
      </div>

    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
