import React from 'react';
import Chart from './Chart.jsx';
import MCQVizualization from './MCQVizualization.jsx';
import Countdown from './Countdown.jsx';

class MCQChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numResponses: props.submitCount,
    };
    console.log(this.state.numResponses);
  }

  render() {
    return (
			<div> Current Answer Distribution
			<Chart />
				{this.state.numResponses === 0 && <h3>a: 27%</h3>} <br />
				{this.state.numResponses === 0 && <h3>b: 13%</h3>}<br />
				{this.state.numResponses === 0 ? <h3>c: 19%</h3> : <h3>100%</h3>}<br />
				{this.state.numResponses === 0 && <h3>d: 12%</h3>}<br />
				{this.state.numResponses === 0 && <h3>e:  8%</h3>}<br />
				{this.state.numResponses === 0 && <h3>f: 20%</h3>}<br />

			</div>
    );
  }
}

export default MCQChecker;