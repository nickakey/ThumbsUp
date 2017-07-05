

            

import React from 'react'
import MCQVizualization from './MCQVizualization.jsx';
import Countdown from './Countdown.jsx';

class MCQChecker extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      numResponses: props.submitCount
    }
    console.log(this.state.numResponses)
  }

	render () {
		return (
			
			<div> Current Answer Distribution 
			{this.state.numResponses === 0 && <h3>a: 0%</h3>} <br/>
			{this.state.numResponses === 0 && <h3>b: 0%</h3> }<br/>
			{this.state.numResponses === 0 ? <h3>c: 0%</h3> : <h3>100%</h3> }<br/>
			{this.state.numResponses === 0 && <h3>d: 0%</h3> }<br/>
			{this.state.numResponses === 0 && <h3>e:  0%</h3> }<br/>
			{this.state.numResponses === 0 && <h3>f: 0%</h3> }<br/>
			

			</div>
			
				
	  )
   }
}

export default MCQChecker;
