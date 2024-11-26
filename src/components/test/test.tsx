// src/components/TestComponent.tsx
import React from 'react';

const TestComponent = () => {
  // Intentionally throwing an error to trigger the error boundary
  throw new Error('This is a test error to trigger the ErrorBoundary!');
  
  return <div>This will never be rendered due to the error.</div>;
};

export default TestComponent;
