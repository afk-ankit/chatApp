import React from "react";
import "../Css/Loading.css";

const Loading = ({ loading }) => {
  if (loading)
    return (
      <div className="loading">
        <div className="loading__spinner">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
};

export default Loading;
