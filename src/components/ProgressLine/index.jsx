import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProgressLine.module.scss';

const ProgressLine = ({ currentStep }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <hr
        className={styles.progressLine}
        style={{
          background: `linear-gradient(
      to right,
      ${currentStep === 1 ? '#A7DBE9' : '#CBCBCB'} 0%, 
      ${currentStep === 1 ? '#A7DBE9' : '#CBCBCB'} 33%, 
      ${currentStep === 2 ? '#FFDB85' : '#CBCBCB'} 33%, 
      ${currentStep === 2 ? '#FFDB85' : '#CBCBCB'} 66%, 
      ${
        location.pathname.startsWith('/event')
          ? '#FFDB85'
          : currentStep === 3
          ? '#FF9681' // Стандартный цвет для третьего шага
          : '#CBCBCB' // Цвет, если шаг ещё не активен
      } 66%, 
      ${
        location.pathname.startsWith('/event')
          ? '#FFDB85'
          : currentStep === 3
          ? '#FF9681'
          : '#CBCBCB'
      } 100%
    )`,
        }}
      />
    </div>
  );
};

export default ProgressLine;
