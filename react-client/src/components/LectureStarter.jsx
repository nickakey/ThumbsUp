import React from 'react';
import axios from 'axios';

class LectureStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lectures: ['The keyword this', 'Execution Contexts']
    };
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onLectureStart() {
    this.props.startLecture(response.data.lectureId);
  }

  render() {
    return (
      <div className="text-center">
        START AN EXISTING LECTURE
        <div className="col-xs-12 text-center top-space">
          {this.state.lectures.map((lecture, i) => {
            return (
              <div
                className="btn btn-sm btn-normal text-center"
                onClick={this.onLectureStart.bind(this)}
                key={i}>
                {lecture}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LectureStarter;
