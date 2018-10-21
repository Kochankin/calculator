import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 
import CalculatorApp from './CalculatorApp/calculatorApp';

import { createStore, bindActionCreators } from "redux"; 
import { Provider, connect } from "react-redux"; 

// INITIAL STATE
const initialState = { 
  currentNumber: 0,
  currentResult: 0,
  output: 0,
  previousWasNumber: true,
  operator: '+',
  history: [[]]
}; 

// REDUCER 
function reducer(state = initialState, action) { 
  let {history, currentResult, currentNumber, previousWasNumber, output, operator} = state;
  if (action.number !== undefined) {
    history[history.length-1].push(action.number);
  } else {
    history[history.length-1].push(action.operator);
  }

  switch (action.type){ 
    case 'INCREMENT': return { 
      ...state, 
      currentResult: state.currentResult + state.currentNumber, 
      previousWasNumber: false , 
      operator: action.operator
    }; 
    case 'DECREMENT': return { 
      ...state, 
      currentResult: state.currentResult -  state.currentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'MULTIPLY': return { 
      ...state, 
      currentResult: state.currentResult *  state.currentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'DIVIDE': return { 
      ...state,
      currentResult: state.currentResult /  state.currentNumber, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'EQUAL': 
    currentResult = eval(currentResult + operator + currentNumber);
    history[history.length-1].push(currentResult);
    return { 
      ...state, 
      previousWasNumber: false, 
      operator: action.operator,
      currentResult: currentResult,
      output: currentResult 
    }; 
    case 'RESET': return { 
      ...state,
      currentResult: 0, 
      previousWasNumber: false, 
      operator: action.operator 
    }; 
    case 'ENTER_NUMBER': 
    return { 
      ...state, 
      currentNumber: action.number, 
      previousWasNumber: true,
      output: action.number,
      history: history
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
      case '+':  this.props.incrementActionCreator(operator);
      break;
      case '-':  this.props.decrementActionCreator(operator);
      break;
      case '*':  this.props.multiplyActionCreator(operator);
      break;
      case '/':  this.props.divideActionCreator(operator);
      break;
      case '=':  this.props.equalActionCreator(operator);
      break;
      case 'CE': this.props.resetActionCreator(operator);
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
    currentNumber: state.currentNumber,
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