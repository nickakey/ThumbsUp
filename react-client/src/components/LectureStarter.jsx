import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class LectureStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onLectureStart(e) {
    var div = $(e.target);
    console.log('what is the lecture id in lecturestarter? ', this.props.lectureId)
    this.props.startLecture(div[0].innerHTML);
  }

  render() {
    return (
      <div className="text-center">
        START AN EXISTING LECTURE
        {this.props.lectures !== null && this.props.lectures.length !== 0
          ? <div className="col-xs-12 text-center top-space">
              {this.props.lectures.map((lecture, i) => {
                return (
                  <div
                    className="btn btn-sm btn-normal text-center"
                    onClick={this.onLectureStart.bind(this)}
                    key={i}>
                    {lecture.name}
                  </div>
                );
              })}
            </div>
          : <h2 className="text-center"> There are no lectures... add one!</h2>
        }
      </div>
    );
  }
}

export default LectureStarter;
