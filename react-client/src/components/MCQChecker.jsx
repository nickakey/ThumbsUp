import React from 'react';
import MCQVizualization from './MCQVizualization.jsx';
import Countdown from './Countdown.jsx';
import Chart from './Chart.jsx';

class MCQChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'MCQ 1'
    };
  }

  render() {
    return (
			<div>
				{this.props.countdown === 0
					? <div>
						<Chart
							question={this.state.question}
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
						<p>Time Remaining: {this.props.countdown}</p>
					</div>
				}
			</div>
    );
  }
}

export default MCQChecker;