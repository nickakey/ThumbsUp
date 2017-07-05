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
      answer:''
    };
  }

  handleOptionChange(event) {
    this.setState({
      answer:event.target.value
    })
  }

  answerSubmit(event) {
    event.preventDefault()
    this.setState({
      submitted:true
    })
    this.props.sendAnswer()
    console.log('here is the submission event', this.state.answer)

  }

  render () {
    return (
      <div className="col-xs-12" >
        <div class="row">
          <div className="col-xs-12 text-center heading" >
  					<h1>When the following code is run, what is the first word in the code that will cause an error to be thrown?</h1>
          </div>
          <div className="col-xs-12 text-center heading" style={{fontFamily: 'Consolas', float: 'center', padding: '20px',border: '3px solid green'}}>
            {'var setTimeoutClone = function(this, that, notNew) {' + '\n' +  'setTimeout(data=> alert(typeof Number(this), Math.floor(Number(this)) % 300 % Number(new));' +  '\n' + 'return break new this continue;}' + '\n \n' + 'setTimeoutClone(Object.keys(this)[0], 1, this);'}

          </div>
				</div>
        <div className="row student">
          <div className="col-xs-12 text-center heading">
            <form  onSubmit={this.answerSubmit.bind(this)} style={{fontWeight: 'bold', fontFamily: 'Times New Roman', textAlign:'left'}}>

              <input type= 'radio' value="a"  name="-" onChange={this.handleOptionChange.bind(this)}/>
              a) this (it's first appearance, as a parameter of the function `setTimeoutClone`) <br/>

              <input type= 'radio' value="b" name="-" onChange={this.handleOptionChange.bind(this)}/>
              b) this      (when it first appears in the context of `Number(this)` <br/>
              
              <input type= 'radio' value="c" name="-" onChange={this.handleOptionChange.bind(this)}/>
              c) new    (when it appears in the context of `Number(new)` <br/>
             
              <input type= 'radio' value="d" name="-" onChange={this.handleOptionChange.bind(this)}/>
               d)    break <br/>
              
              <input type= 'radio' value="e" name="-" onChange={this.handleOptionChange.bind(this)}/>
              e) new (after the word `break`) <br/>
      
              <input type= 'radio' value="f" name="-" onChange={this.handleOptionChange.bind(this)}/>
                      f) continue (after the word `this`) <br/>
             
              <input type= 'radio' value="g" name="-"onChange={this.handleOptionChange.bind(this)} />
               g) none of the above <br/> <br/><br/>

              {this.state.submitted ? <h5>Your answer has been submitted </h5> : <button >Submit Answer</button>}
          </form>
          </div>
        </div>
        <Countdown countdown={this.props.countdown} />
      </div>
    )
  }
}

export default ThumbInput;
