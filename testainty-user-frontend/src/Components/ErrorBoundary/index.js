import { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setError(event.error || new Error('An unknown error occurred.'));
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (error) {
    return (
      <div>
        <h2>Something went wrong:</h2>
        {/* <p>{error.message}</p> */}
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
