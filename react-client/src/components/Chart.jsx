import React from 'react';
import ReactDOM from 'react-dom';
import rd3 from 'rd3';
const io = require('socket.io-client');
const socket = io();

const BarChart = rd3.BarChart;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: [
				{
					"name": "Series A",
					"values": [
						{ "x": 'A', "y": 27 },
						{ "x": 'B', "y": 12 },
						{ "x": 'C', "y": 40 },
						{ "x": 'D', "y": 15 },
					]
				},
			],
      question: props.question
    };
  }

  render() {
    return (
      <div>
        <BarChart
          data={this.state.barData}
          width={500}
          height={300}
          title={this.state.question}
          xAxisLabel="Option"
          yAxisLabel="Number"
          />
      </div>
    );
  }
}

export default Chart;