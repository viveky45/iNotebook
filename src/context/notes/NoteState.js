import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []


  const [notes, setNotes] = useState(notesInitial);
  //GET ALL NOTE
  const getNotes = async () => {

    //API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json);

  }
  //add a note
  const addNote = async ({ title, description, tag }) => {
    //api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });


    console.log(response);
  }

  //delete a note

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });
    console.log("deleting the note with id", id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
    console.log(response);
  }


  //edit a note

  const editNote = async (id, title, description, tag) => {
    console.log(id)

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    console.log(response);
    const newnotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newnotes.length; i++) {
      const element = newnotes[i];
      if (element._id === id) {


        newnotes[i].title = title;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;

      }

    }
    console.log(notes);
    setNotes(newnotes);
  }
  return (

    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
