import React from 'react'; 
import './calculator.css'; 

import Numbers from './../Numbers/numbers';
import Operators from './../Operators/operators';
import Output from './../Output/output';

class Calculator extends React.Component { 
    render() { 
      return ( 
        <div className="calculator"> 
        <h1> Calculator </h1>
          <Output output={this.props.output} />
          <div className="calculator__controls">
            <Numbers onNumberClick={this.props.onNumberClick} />
            <Operators onOperatorClick={this.props.onOperatorClick} />
          </div>
      </div> 
      ); 
    } 
  } 

  export default Calculator;