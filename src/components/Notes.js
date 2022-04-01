import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


const Notes = (props) => {
    const context = useContext(noteContext);
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
    let history = useHistory();
    const { notes, getNotes, onchange, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();

        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line 
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);


    const updatenotes = (currentnotes) => {
        ref.current.click();
        console.log(currentnotes._id)
        setNotes({ id: currentnotes._id, etitle: currentnotes.title, edescription: currentnotes.description, etag: currentnotes.tag });
        let l =document.getElementById('etitle');
        let m =document.getElementById('edescription');
        let n =document.getElementById('etag');
        
        m.defaultValue="";
        n.defaultValue="";
        l.defaultValue="";


        
        l.defaultValue=currentnotes.title;
        console.log(l.defaultValue)
        m.defaultValue=currentnotes.description;
        n.defaultValue=currentnotes.tag;
        

    }

    const handleclick = () => {
        console.log("updating the notes");
        let a = document.getElementById('etitle').value;
        let b = document.getElementById('edescription').value;
        let c = document.getElementById('etag').value;
        console.log(a);
        console.log(b);
        console.log(c);
        editNote(note.id, a, b, c);


        refclose.current.click();
        props.showalert("Updated successfully", "success")


    }


    return (
        <div>
            <AddNote showalert={props.showalert} />

            <button type="button" className="btn btn-primary" style={{ display: 'none' }} ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>




                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="title"  onChange={onchange} aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="description"  onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="tag" onChange={onchange} />
                                </div>


                            </form>
                        </div>




                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' container row mx-4 my-3'>

                <h1>Your Notes</h1>
                <div className="container mx-3">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {

                    return <NoteItem key={note._id} updatenotes={updatenotes} note={note} showalert={props.showalert} />
                })}

            </div>
        </div>
    )
}

export default Notes
