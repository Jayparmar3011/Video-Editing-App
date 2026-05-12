import React from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <h1>
          Something went
          wrong.
        </h1>
      );
    }

    return this.props
      .children;
  }
}

export default ErrorBoundary;