import React from "react";
import "./FaceRecognation.css";

const FaceRecognation = ({ imageUrl, propBox }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            left: propBox.leftCol,
            top: propBox.topRow,
            right: propBox.rightCol,
            bottom: propBox.bottomRow
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognation;
