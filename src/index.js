import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
   return (
    promiseInProgress && 
   <div className='dots-bars-4'></div>
  );  
 }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>    <App />
    <LoadingIndicator />
    </>
);

