// react-app-env.d.ts
/// <reference types="react-scripts" />

// Declare process.env types
interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_URL: string;
    // Add other environment variables here
  }
  