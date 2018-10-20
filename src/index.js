import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 

import { createStore, bindActionCreators } from "redux"; // импортировать createStore 
import { Provider, connect } from "react-redux"; // импортировать Provider 

const initialState = { count: 0 }; // задать изначальное значение 

// задать редьюсер = обработчик экшнов на основании переданных аргументов 
function reducer(state = initialState, action) { 
  switch (action.type){ 
    case 'INCREMENT': return {count: state.count + action.amount }; 
    case 'DECREMENT': return {count: state.count - action.amount }; 
    case 'RESET': return {count: 0 }; 
    default: return state; 
  } 
} 

// задать экшны = описание действия + необх.параметры 

const incrementActionCreator = (amount) => { 
  return { 
    type: 'INCREMENT', 
    amount: amount 
  } 
}; 

const decrementActionCreator = (amount) => { 
  return { 
    type: 'DECREMENT', 
    amount: amount 
  } 
}; 

const resetActionCreator = () => { 
  return { 
    type: 'RESET' 
  } 
}; 

// инициировать стор = главное хранилище 
const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 

class Counter extends React.Component { 
  render() { 
    const dispatch = this.props.dispatch; 
    console.log(this.props) 
    return ( 
      <div className="counter"> 
        <span className="count"> {this.props.count} </span> 

        <div className="buttons"> 
          <button 
            className="decrement" 
            onClick={() => this.props.decrementActionCreator(1)}
          > - </button> 

          <button 
            className="increment" 
            onClick={() => this.props.incrementActionCreator(1)}
          > + </button> 

          <button 
            className="reset" 
            onClick={() => this.props.resetActionCreator()}
          > reset </button> 

        </div> 
      </div> 
    ); 
  } 
} 

const mapStateToProps = (state) => { 
  return { 
   count: state.count 
  } 
}; 

const mapDispatchToProps = (dispatch) => { 
  return { 
    incrementActionCreator: bindActionCreators(incrementActionCreator, dispatch), 
    decrementActionCreator: bindActionCreators(decrementActionCreator, dispatch), 
    resetActionCreator: bindActionCreators(resetActionCreator, dispatch) 
  } 
}; 

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter); 

ReactDOM.render( 
  <Provider store={store}> 
    <WrappedCounter /> 
  </Provider>, 
  document.getElementById('root') 
);