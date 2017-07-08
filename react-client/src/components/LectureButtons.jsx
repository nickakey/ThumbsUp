import React from 'react';
import axios from 'axios';

class LectureButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  onThumbsCheck() {
    console.log('onThumbsCheck is being called');
    //console.log('this.props.lectureId', this.props.lectureId);
    axios({
      method: 'post',
      url: '/checkthumbs',
      params: {
        lectureID: this.props.lectureId
      }
    }).then((response) => {
      console.log(this.props.lectureId);
      this.props.startThumbsCheck(response.data.questionId);
    }).catch((error) => {
      console.log(error);
    });
  }

  onMCQ() {
    console.log('onMCQis being called');
    console.log('this.props.lectureId', this.props.lectureId);
    axios({
      method: 'post',
      url: '/mcq',
      params: {
        lectureID: this.props.lectureId
      }
    }).then((response) => {
      console.log('here in MCQ stuff then');
      this.props.startMCQ(response.data.questionId);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <div
            className="btn btn-lg btn-success"
            onClick={this.onThumbsCheck.bind(this)}>
            Check Thumbs
					</div>
        </div>
        <div className="col-xs-12 text-center">
          {this.props.questions !== null
            ? <div>
                {this.props.questions.map((el, i) => {
                  return (
                    <div
                      className="btn question-option"
                      key={i}
                      onClick={() => {
                        this.onMCQ.call(this);
                        this.props.changeQuestion(el);
                      }
                      }>
                      Ask: {el.question}
                    </div>
                    );
                  })
                }
              </div>
             : <div></div>
          }
        </div>
        <div className="col-xs-12 text-center">
          <div
            className="btn btn-lg btn-danger"
            onClick={this.props.endLecture}>
            End Lecture
					</div>
        </div>
      </div>
    );
  }

}

export default LectureButtons;
