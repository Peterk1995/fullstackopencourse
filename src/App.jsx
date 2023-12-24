import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em> Note App, department of Runescape in 2023 </em>
    </div>
  )
}


const App = (props) => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)



  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }




  const handleNoteChange = (event) => {
    const value = event.target.value;
  
    // Clear the default text when user starts typing
    if (newNote === 'a new note...' && value !== '') {
      setNewNote(value);
    } else {
      console.log(value);
      setNewNote(value);
    }
  }

  const notesToShow = showAll 
  ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  if (!notes) { 
    return null 
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {

        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}  
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="a new note..."
        />
        <button type="submit">save</button>
      </form> 
      <Footer/>
    </div>
  )
}

export default App