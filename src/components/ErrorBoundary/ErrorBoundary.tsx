"use client"

import React, { Component, ReactNode } from "react";
import { MdOutlineError } from "react-icons/md";
import "./ErrorBoundary.css"; // Import for optional custom styling

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows a fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service or console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    // Reset the error state to allow the component to re-render
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#10141E] h-screen flex flex-col items-center justify-center text-center px-4">
          {/* Error Icon */}
          <MdOutlineError className="text-[#FC4747] w-20 h-20"/>

          {/* Error Title */}
          <h1 className="text-white text-3xl font-bold mb-4">
            Oops! Something went wrong.
          </h1>

          {/* Error Description */}
          <p className="text-gray-400 max-w-md leading-relaxed mb-6">
            We encountered an unexpected issue. Please try again or contact support if the problem persists.
          </p>

          {/* Retry Button */}
          <button
            onClick={this.handleRetry}
            className="px-6 py-3 bg-[#FC4747] text-white rounded-md font-medium hover:bg-[#e43838] transition-transform transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
