import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{margin: 'auto', textAlign:'left',padding: '15px',fontFamily: 'Times New Roman'}}>
        Time Left: {this.props.countdown}
      </div>
    );
  }
}

export default Countdown;