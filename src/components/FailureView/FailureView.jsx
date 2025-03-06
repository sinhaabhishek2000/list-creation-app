import React from "react";
import "./FailureView.css";

const FailureView = ({ onRetry }) => {
  return (
    <div className="failure-view">
      <img src="./failure-view.jpg" alt="faiure-image" height="auto" width="auto"/>
      <h3>Something went wrong. Please try again</h3>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default FailureView;
