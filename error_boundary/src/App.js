import React from "react";
import ErrorBoundary from "./ErrorBoundary";

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <h2>Error 1</h2>
        <BuggyCounter />
        <h2>Error 2</h2>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <h2>Error 3</h2>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <h2>Error 4</h2>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
