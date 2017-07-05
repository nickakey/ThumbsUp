import React from 'react';
import axios from 'axios'

class LectureCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  onLectureStart () {
    axios({
      method: 'post',
      url: '/lecture',
      params: {
        name: this.state.name
      }
    }).then((response) => {
      this.props.startLecture(response.data.lectureId);
    }).catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <div>
        <div>
        CREATE NEW LECTURE
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            placeholder="Enter lecture name"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="col-xs-3 text-center">
          <div
            className="btn btn-sm btn-success"
            onClick={this.onLectureStart.bind(this)}>
            Save Lecture
          </div>
        </div>
      </div>
    )
  }
}

export default LectureCreator
