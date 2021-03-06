import React from "react";
const LaodingAnimation = ({ text }) => {
  return (
    <div className="main d-flex justify-content-center ">
      <div
        className="spinner-border text-danger align-self-center"
        style={{ height: "10vw", width: "10vw" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <span
        className="align-self-center"
        style={{ position: "absolute", color: "white" }}
      >
        {text}
      </span>
    </div>
  );
};

export default LaodingAnimation;
