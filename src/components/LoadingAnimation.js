import React from "react";
const LoadingAnimation = (props) => {
  return (
    <div className="main d-flex justify-content-center ">
      <div
        className="spinner-border text-danger align-self-center"
        style={{ height: "10vw", width: "10vw" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
