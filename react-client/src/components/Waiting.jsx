import React from 'react';

class Waiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="col-xs-12 text-center">
        {this.props.waitingFor === 'lecture'
        ? <div>
            <p>Hi {this.props.givenName}!</p>
            <p>Please wait for a lecture to start.</p>
          </div>
        : <div>
            <p>Now in lecture: {this.props.lectureName}</p>
            <p>Please wait for a question.</p>
          </div>}
      </div>
    )
  }
}

export default Waiting;
