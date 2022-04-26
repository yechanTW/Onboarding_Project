import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({
      error: error,
    });
  }

  render() {
    if (this.state.error) {
      return <h1> 에러 발생 !</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
