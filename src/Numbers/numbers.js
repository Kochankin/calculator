import React from 'react'; 
import './numbers.css'; 
import Button from './../Button/button';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];

class Numbers extends React.Component { 
    getNumbers(){
      return NUMBERS.map((number, index) => (
        <Button 
          className="number"
          key={index} 
          onClick={() => this.props.onNumberClick(number)}
          value={number}
        />
      ));
    }
  
    render() { 
      return ( 
          <section className='numbers'> {this.getNumbers()}</section>
      ); 
    } 
  } 

  export default Numbers;