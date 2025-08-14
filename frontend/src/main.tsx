import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught error:', error);
    // Send to terminal via fetch to backend
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'ERROR_BOUNDARY',
        message: error.message,
        stack: error.stack
      })
    }).catch(() => {
      // If backend is not available, at least try console
      console.error('Failed to send error to backend:', error);
    });
    
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Global unhandled error listeners
window.addEventListener('error', (event) => {
  fetch('/api/debug-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'GLOBAL_ERROR',
      message: event.message,
      stack: event.error?.stack,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
});

window.addEventListener('unhandledrejection', (event) => {
  fetch('/api/debug-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'UNHANDLED_REJECTION',
      message: (event.reason as Error)?.message || String(event.reason),
      stack: (event.reason as Error)?.stack,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
});

console.log('main.tsx: Starting React app');

// Send startup log to backend
fetch('/api/debug-log', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'APP_START',
    message: 'React app starting up',
    timestamp: new Date().toISOString()
  })
}).catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
