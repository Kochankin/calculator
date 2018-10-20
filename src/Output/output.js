import React from 'react'; 
import './output.css'; 

class Output extends React.Component { 
    render() { 
      return ( 
          <section className="calculator__output"> {this.props.output}</section>
      ); 
    } 
  } 

  export default Output;