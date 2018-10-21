import React from 'react'; 
import './history.css'; 

class History extends React.Component { 
    render() { 
      return ( 
          <section className="history"> 
            <h2 className="history__heading"> History: </h2>
            <p className="history__field"> {this.props.history}</p>
          </section>
      ); 
    } 
  } 

  export default History;