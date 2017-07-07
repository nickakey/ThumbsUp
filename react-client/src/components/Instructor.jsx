import React from 'react';
import LectureStarter from './LectureStarter.jsx';
import LectureCreator from './LectureCreator.jsx';
import LectureButtons from './LectureButtons.jsx';
import ThumbsChecker from './ThumbsChecker.jsx';
import MCQChecker from './MCQChecker.jsx';

const io = require('socket.io-client');
const socket = io();

class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          title: "What is Nick's favorite food?",
          answer1: "Gus's Chicken Tenders",
          answer2: "Chicken Parmesian",
          answer3: "Gnochi with red sauce",
          answer4: "Grilled Cheese",
          correctAnswer: 1
        },
        {
          title: "What is Jake's favorite food?",
          answer1: "Salmon",
          answer2: "Steak",
          answer3: "Boston Cream Pie",
          answer4: "Mousse",
          correctAnswer: 1
        }, 
        {
          title: "What is the best pie?",
          answer1: "Apple",
          answer2: "Cherry",
          answer3: "Key Lime",
          answer4: "Sweet potato",
          correctAnswer: 1
        }
      ]
      
    };
    socket.on('averageThumbValue', (data) => {
      if (props.view === 'instructor') {
        props.changeThumbValue(data.averageThumbValue);
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.lectureStatus === 'lectureNotStarted'
          ? <div>
            <div className="col-xs-6 text-center">
              <LectureCreator
              />
            </div>
            <div className="col-xs-6 text-center">
              <LectureStarter
                startLecture={this.props.startLecture}
              />
            </div>
          </div>
          : this.props.lectureStatus === 'lectureStarted'
          ? <LectureButtons
              questions={this.state.questions}
              lectureId={this.props.lectureId}
              startThumbsCheck={this.props.startThumbsCheck}
              endLecture={this.props.endLecture}
            />
            : this.props.questionType !== 'thumbs'
              ? <ThumbsChecker
                startLecture={this.props.startLecture}
                lectureId={this.props.lectureId}
                countdown={this.props.countdown}
                thumbValue={this.props.thumbValue}
                clearThumbsCheck={this.props.clearThumbsCheck}
              />
              : <MCQChecker
                questions={this.state.questions}
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
