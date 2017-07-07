import React from 'react';
import ReactDOM from 'react-dom';
import rd3 from 'rd3';

const PieChart = rd3.PieChart;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [
        { label: 'A', value: 27.0 },
        { label: 'B', value: 13.0 },
        { label: 'C', value: 19.0 },
        { label: 'D', value: 12.0 },
        { label: 'E', value: 8.0 },
        { label: 'F', value: 20.0 }
      ],
      question: 'MCQ 1'
    };
  }

  render() {
    return (
      <div>
        <PieChart
          data={this.state.pieData}
          width={450}
          height={400}
          radius={110}
          innerRadius={20}
          sectorBorderColor="white"
          title={this.state.question} />
      </div>
    );
  }
}

export default Chart;