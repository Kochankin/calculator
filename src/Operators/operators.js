import React from 'react'; 
import './operators.css'; 
import Button from './../Button/button';

const OPERATORS = ['+', '-', '*', '/', '=', 'CE'];

class Operators extends React.Component { 
    getOperators(){
      return OPERATORS.map((operator, index) => (
        <Button 
          className="calculator__button"
          key={index} 
          onClick={() => this.props.onOperatorClick(operator)}
          value={operator}
        />
      ));
    }
  
    render() { 
      return ( 
          <section className='operators'> {this.getOperators()}</section>
      ); 
    } 
  } 

  export default Operators;