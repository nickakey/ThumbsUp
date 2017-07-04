import React from 'react';

 class Countdown extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {

	    };
	  }

	 render() {
	 	return (
	    <div className="col-xs-12 text-center countdown">
        {this.props.countdown}
      </div>
	  )
	 }

 }

 export default Countdown;
