import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updatenotes } = props;


    return (
        <div className='col-md-3'>
            <div className="card" >

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash" onClick={() => { deleteNote(note._id); props.showalert("Deleted Successfully", "success")}}></i>
                    <i className="fas fa-edit mx-3" onClick={() => { updatenotes(note) }}></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
