import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setnotes } = context;
    return (
        <div>
            <div className='row my-3'>

                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem key={note._id } note = {note} />
                })}
                
            </div>
        </div>
    )
}

export default Notes
