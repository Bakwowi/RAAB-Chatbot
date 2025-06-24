import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
  if (this.state.hasError) {
    return (
      <div style={{ width: "100vw", height: "100vh", color: "var(--text-color)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>Oops! Something went wrong.</h1>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }
  return this.props.children;
}

}

export default ErrorBoundary;
