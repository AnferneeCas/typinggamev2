import React from "react";
//css
import "./Playground.css";
const Playground = () => {
  return (
    <div className="main">
      <div className="container container-playground">
        <div className="paragraph">
          <textarea
            rows={12}
            readOnly={true}
            className="paragraph-textarea"
          ></textarea>
        </div>
        <div className="match-label">
          <div className="row">
            <div className="col-md-5">Anfernee</div>
            <div className="col-md-2">
              <b>VS</b>
            </div>
            <div className="col-md-5">Arturo</div>
          </div>
        </div>
        <div className="textarea">
          <textarea
            rows={12}
            placeholder={"Write here"}
            className="textarea-input"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Playground;
