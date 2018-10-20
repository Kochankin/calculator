import React from 'react'; 
import './calculatorApp.css'; 

import Calculator from './../Calculator/calculator';
import History from './../History/history';

class CalculatorApp extends React.Component { 
    render() { 
      return ( 
    <div className="calculator-app">
      < Calculator
        output={this.props.output} 
        onNumberClick={this.props.onNumberClick}
        onOperatorClick={this.props.onOperatorClick}
      />
      <History history={this.props.history} />
    </div>
      ); 
    } 
  } 

  export default CalculatorApp;