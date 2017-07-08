import React from 'react';
import MCQVizualization from './MCQVizualization.jsx';
import Countdown from './Countdown.jsx';
import Chart from './Chart.jsx';

class MCQChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOptions: this.props.currentOptions
    };
  }


  render() {
    return (
			<div>
				<div>
					{this.state.numResponses === 0 && <h3>{this.props.MCQAnswer}</h3>} <br />
				</div>


				<div>
					{this.props.countdown === 0
						? <div>
							<Chart
								currentQuestion={this.props.currentQuestion}
								barData={this.state.barData}
								startLecture={this.props.startLecture}
								lectureId={this.props.lectureId}
								countdown={this.props.countdown}
								thumbValue={this.props.thumbValue}
								clearThumbsCheck={this.props.clearThumbsCheck}
								submitCount={this.props.submitCount}
								startThumbsCheck={this.props.startThumbsCheck}
							/>
						</div>
						: <div>
							<h1>Question: {this.props.currentQuestion}</h1>
							<h3>Option A: {this.props.currentOptions[0]}</h3>
							<h3>Option B: {this.props.currentOptions[1]}</h3>
							<h3>Option C: {this.props.currentOptions[2]}</h3>
							<h3>Option D: {this.props.currentOptions[3]}</h3>
							<br />
							<h3>Time Remaining: {this.props.countdown}</h3>
						</div>
					}

				</div>
			</div>
    );
  }
}

export default MCQChecker;