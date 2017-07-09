import React from 'react';
import ThumbVisualization from './ThumbVisualization.jsx';
import Countdown from './Countdown.jsx';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
//var MCQcode = require('./mcq.txt');

class ThumbInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      answer: ''
    };
  }

  handleOptionChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  answerSubmit(event) {
    event.preventDefault();
    this.setState({

      submitted: true
    });
    this.props.sendAnswer(this.state.answer);
    console.log('here is the submission event', this.state.answer);


  }

  render() {
    return (
      <div className="col-xs-12" >
        <div class="row">
          <div>
            When the following code is run, what is the first word in the code that will cause an error to be thrown?
          </div>
         
        </div> 
        <div className="row student"  style={{fontWeight:'normal'}}>
          <div >
            <form onSubmit={this.answerSubmit.bind(this)} style={{margin: 'auto', width: '50%',padding: '10px',fontFamily: 'Times New Roman'}}>

              <input type='radio' value="a" name="-" onChange={this.handleOptionChange.bind(this)} />
              a) this (it's first appearance, as a parameter of the function `setTimeoutClone`) <br />

              <input type='radio' value="b" name="-" onChange={this.handleOptionChange.bind(this)} />
              b) this      (when it first appears in the context of `Number(this)` <br />

              <input type='radio' value="c" name="-" onChange={this.handleOptionChange.bind(this)} />
              c) new    (when it appears in the context of `Number(new)` <br />

              <input type='radio' value="d" name="-" onChange={this.handleOptionChange.bind(this)} />
              d)    break <br />

              <input type='radio' value="e" name="-" onChange={this.handleOptionChange.bind(this)} />
              e) new (after the word `break`) <br />

              <input type='radio' value="f" name="-" onChange={this.handleOptionChange.bind(this)} />
              f) continue (after the word `this`) <br />

              <input type='radio' value="g" name="-" onChange={this.handleOptionChange.bind(this)} />
              g) none of the above <br /> <br /><br />

              {this.state.submitted ? <h5>Your answer has been submitted </h5> : <button style={{backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '4px 4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px'}}>Submit Answer</button>}
            </form>
          </div>
        </div>
        <Countdown countdown={this.props.countdown} />
      </div>
    );
  }
}

export default ThumbInput;