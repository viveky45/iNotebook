import React from 'react'


const NoteItem = (props) => {
    const {note} = props;

    return (
        <div className='col-md-3'>
            <div className="card" >

                <div className="card-body">
                    <h5 className="card-title">{note!==undefined?note.title:""}</h5>
                    <p className="card-text">{note!==undefined?note.description:""}</p>
                    <i className="fas fa-trash"></i>
                    <i className="fas fa-edit mx-3"></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
