import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const notesInitial = 
        [
  {
    "_id": "61c3532928e12707a4d953da",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:32:41.590Z",
    "__v": 0
  },
  {
    "_id": "61c3532a28e12707a4d953dc",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:32:42.219Z",
    "__v": 0
  },
  {
    "_id": "61c3532a28e12707a4d953de",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:32:42.373Z",
    "__v": 0
  },
  {
    "_id": "61c3532a28e12707a4d953e0",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:32:42.554Z",
    "__v": 0
  },
  {
    "_id": "61c3532a28e12707a4d953e2",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:32:42.779Z",
    "__v": 0
  },
  {
    "_id": "61c353b49c993aa757aa66e4",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:35:00.551Z",
    "__v": 0
  },
  {
    "_id": "61c353b59c993aa757aa66e6",
    "user": "61baae2fc994b6f5d1e49e40",
    "title": "my title",
    "description": "please wake up early",
    "tag": "personal",
    "date": "2021-12-22T16:35:01.606Z",
    "__v": 0
  },
]
    const [notes, setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes,setnotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
