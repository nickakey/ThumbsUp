import React from 'react';
import ReactDOM from 'react-dom';
import rd3 from 'rd3';
import axios from 'axios';
const io = require('socket.io-client');
const socket = io();

const BarChart = rd3.BarChart;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: [
        {
          'name': 'Answers',
          'values': [
            { 'x': 'A', 'y': 0 },
            { 'x': 'B', 'y': 0 },
            { 'x': 'C', 'y': 0 },
            { 'x': 'D', 'y': 0 },
          ]
        },
      ],
      currentQuestion: props.currentQuestion,
      currentId: props.currentId
    };
    console.log(this.state.currentId);
  }

  componentWillMount(){
    console.log('component will mount is firing')
    axios({
      method: 'get',
      url: '/answers',
      // params: {
      //   lectureName: lectureName
      // }
    }).then((result) => {
      const newBarData = [
        {
          'name': 'Answers',
          'values': [
            { 'x': 'A', 'y': 0 },
            { 'x': 'B', 'y': 0 },
            { 'x': 'C', 'y': 0 },
            { 'x': 'D', 'y': 0 },
          ]
        },
      ]
      const letterChart = {a: 0, b: 1, c:2, d:3};
      result.data.forEach((answer, i)=>{
        let index = letterChart[answer['MCQ_value']];
        if(index < 4){
          newBarData[0].values[index]['y']++;
        }
      })
      this.setState({
        barData: newBarData
      })
    })
    .catch((err)=>{
      console.log("This is the error from compoent will mount ", err);
    })
  }

  render() {
    return (
      <div className="col-xs-12 text-center">
        <BarChart
          data={this.state.barData}
          width={500}
          height={300}
          title={this.state.currentQuestion}
          xAxisLabel="Option"
          yAxisLabel="Number"
        />
        <div
            className="btn btn-danger btn-center"
            onClick={this.props.closeChart}>
            Close
        </div>
      </div>
    );
  }
}

export default Chart;