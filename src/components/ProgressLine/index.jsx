import React from "react";
import styles from "./ProgressLine.module.scss";

const ProgressLine = ({ currentStep }) => {
  return (
    <div className={styles.container}>
      <hr
        className={styles.progressLine}
        style={{
          background: `linear-gradient(
      to right, 
      ${currentStep === 1 ? "#A7DBE9" : "#CBCBCB"} 0%, 
      ${currentStep === 1 ? "#A7DBE9" : "#CBCBCB"} 33%, 
      ${currentStep === 2 ? "#FFDB85" : "#CBCBCB"} 33%, 
      ${currentStep === 2 ? "#FFDB85" : "#CBCBCB"} 66%, 
      ${currentStep === 3 ? "#FF9681" : "#CBCBCB"} 66%, 
      ${currentStep === 3 ? "#FF9681" : "#CBCBCB"} 100%
    )`,
        }}
      />
    </div>
  );
};

export default ProgressLine;
