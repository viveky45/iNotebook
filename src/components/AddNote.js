import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote, getNotes } = context;
    const [note, setNotes] = useState({ title: "", description: "", tag: "default" })
    const handleclick = (e) => {
        e.preventDefault();

        addNote(note);
        getNotes();
        props.showalert("Added note successfully", "success");
        

    }



    const onchange = (e) => {

        setNotes({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add a Note</h1>


                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onchange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} />
                    </div>

                    <button disabled={note.description.length === 0 || note.title.length === 0} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
            <NoteContext.Provider value={{ onchange }} >
                {props.children}
            </NoteContext.Provider>
        </div>

    )
}

export default AddNote
