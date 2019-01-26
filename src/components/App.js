import React, { Component } from 'react';
import noteAPI from '../apis/noteAPI'
import Note from './Note';
import AddButton from './AddButton';
import styles from './App.module.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: {}
    };
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    noteAPI.get('/notes').then(res => {
      this.setState({ notes: res.data });
    });
  }

  handleButtonClick = () => {
    noteAPI.post('/notes', {
      message: '',
      status: 'active'
    }).then(res => {
      this.getNotes();
    });
  };

  handleCheckboxClick = event => {
    const { checked, value } = event.target;

    noteAPI.patch(`/notes/${value}`, {
      status: checked ? 'done' : 'active'
    }).then(res => {
      this.getNotes();
    });
  };

  handleMessageChange = event => {
    const { value, dataset } = event.target;

    noteAPI.patch(`/notes/${dataset.id}`, {
      message: value,
    }).then(res => {
      this.getNotes();
    });
  };

  handleNoteDelete = event => {
    const { dataset } = event.target;

    noteAPI.delete(`/notes/${dataset.id}`).then(res => {
      this.getNotes();
    });
  }

  renderAddButton() {
    return <AddButton onButtonClick={this.handleButtonClick} />;
  }

  renderNotes() {
    if (Object.keys(this.state.notes).length === 0) {
      return <div className={styles.emptyText}>No notes yet.</div>;
    }

    return Object.entries(this.state.notes).map(note => {
      const noteObj = note[1];
      const { _id, message, status } = noteObj;

      return (
        <Note
          key={_id}
          id={_id}
          message={message}
          status={status}
          onCheckboxClick={this.handleCheckboxClick}
          onMessageChange={this.handleMessageChange}
          onNoteDelete={this.handleNoteDelete}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Note Me!</h1>
        <div className={styles.box}>
          {this.renderNotes()}
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

export default App;
