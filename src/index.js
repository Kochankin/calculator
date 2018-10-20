import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 
import CalculatorApp from './CalculatorApp/calculatorApp';

import { createStore, bindActionCreators } from "redux"; 
import { Provider, connect } from "react-redux"; 

// INITIAL STATE
const initialState = { 
  curentNumber: 0,
  currentResult: 0,
  output: 0,
  previousWasNumber: true,
  operator: '+',
  history: [[]]
}; 

// REDUCER 
function reducer(state = initialState, action) { 
  switch (action.type){ 
    case 'INCREMENT': return { 
      ...state, 
      currentResult: state.currentResult + state.curentNumber, 
      previousWasNumber: false , 
      operator: action.operator
    }; 
    case 'DECREMENT': return { 
      ...state, 
      currentResult: state.currentResult -  state.curentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'MULTIPLY': return { 
      ...state, 
      currentResult: state.currentResult *  state.curentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'DIVIDE': return { 
      ...state,
      currentResult: state.currentResult /  state.curentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'EQUAL': return { 
      ...state, 
      previousWasNumber: false, 
      operator: action.operator,
      output: state.currentResult 
    }; 
    case 'RESET': return { 
      ...state,
      currentResult: 0, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'ENTER_NUMBER': return { 
      ...state, 
      curentNumber: action.number, 
      previousWasNumber: true,
      output: action.number
    };
    default: return state; 
  } 
} 

// ACTION CREATORS
const incrementActionCreator = (operator) => {
  return { type: 'INCREMENT', operator: operator}
}

const decrementActionCreator = (operator) => {
  return { type: 'DECREMENT', operator: operator}
}

const multiplyActionCreator = (operator) => {
  return { type: 'MULTIPLY', operator: operator}
}

const divideActionCreator = (operator) => {
  return { type: 'DIVIDE', operator: operator}
}

const equalActionCreator = (operator) => {
  return { type: 'EQUAL', operator: operator}
}

const resetActionCreator = (operator) => {
  return { type: 'RESET', operator: operator}
}

const numberActionCreator = (number) => {
  return {type: 'ENTER_NUMBER', number: number}
}

// STORE
const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 


// CLASS
class Calculator extends React.Component { 
  constructor(props){
    super(props);
    this.defineCreator = this.defineCreator.bind(this);
  } 

  defineCreator(operator){
    switch (operator){ 
      case '+':  this.props.incrementActionCreator();
      break;
      case '-':  this.props.decrementActionCreator();
      break;
      case '*':  this.props.multiplyActionCreator();
      break;
      case '/':  this.props.divideActionCreator();
      break;
      case '=':  this.props.equalActionCreator();
      break;
      case 'CE': this.props.resetActionCreator();
      break;
      default:
    }; 
  }

  render() { 
    return ( 
      <CalculatorApp 
        output={this.props.output} 
        onNumberClick={this.props.numberActionCreator}
        onOperatorClick={this.defineCreator}
        history={this.props.history}
      />  
    ); 
  } 
} 

// TRANSFER STATE TO CLASS PROPS
const mapStateToProps = (state) => { 
  return { 
    curentNumber: state.curentNumber,
    currentResult: state.currentResult,
    output: state.output,
    previousWasNumber: state.previousWasNumber,
    operator: state.operator,
    history: state.history
  } 
}; 


// TRANSFER ACTION CREATORS TO CLASS PROPS
const mapDispatchToProps = (dispatch) => { 
  return { 
    incrementActionCreator: bindActionCreators(incrementActionCreator, dispatch), 
    decrementActionCreator: bindActionCreators(decrementActionCreator, dispatch), 
    multiplyActionCreator: bindActionCreators(multiplyActionCreator, dispatch), 
    divideActionCreator: bindActionCreators(divideActionCreator, dispatch), 
    equalActionCreator: bindActionCreators(equalActionCreator, dispatch), 
    resetActionCreator: bindActionCreators(resetActionCreator, dispatch), 
    numberActionCreator: bindActionCreators(numberActionCreator, dispatch), 
  } 
}; 

// CONNECT STORE AND CLASS
const WrappedCalculator = connect(mapStateToProps, mapDispatchToProps)(Calculator); 

// RENDER APP
ReactDOM.render( 
  <Provider store={store}> 
    <WrappedCalculator /> 
  </Provider>, 
  document.getElementById('root') 
);