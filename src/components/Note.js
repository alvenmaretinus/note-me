import React, { Component } from 'react';
import styles from './Note.module.css'

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
    this.inputField = React.createRef();
  }

  handleMessageClick = () => {
    this.setState({ isEdit: true });
    document.addEventListener('click', this.handeOutsideClick);
  };

  handeOutsideClick = event => {
    if (event.target !== this.inputField.current) {
      this.setState({ isEdit: false });
      document.removeEventListener('click', this.handeOutsideClick);
    }
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) {
      this.setState({ isEdit: false });
    }
  }

  render() {
    const { id, message, status, onCheckboxClick, onMessageChange, onNoteDelete } = this.props;

    return (
      <div className={styles.note}>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            value={id}
            checked={status === 'done'}
            onChange={onCheckboxClick}
          />
          <span />
        </div>
        {this.state.isEdit
          ? <input
              type="text"
              className={styles.messageInput}
              data-id={id}
              value={message}
              onKeyUp={this.handleKeyUp}
              onChange={onMessageChange}
              ref={this.inputField}
              autoFocus
            />
          : <span className={[styles.message, status === 'done' && styles.done].join(' ')} onClick={this.handleMessageClick}>{message}</span>}
        <div className={styles.icon} data-id={id} onClick={onNoteDelete} />
      </div>
    )
  }
}

export default Note;
