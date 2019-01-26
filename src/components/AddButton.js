import React from 'react';
import styles from './AddButton.module.css';

const AddButton = ({ onButtonClick }) => (
  <button className={styles.button} onClick={onButtonClick}>
    <span className={styles.icon} />
  </button>
);

export default AddButton;
