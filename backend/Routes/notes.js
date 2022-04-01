const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../model/Note');

//Route 1: get all the notes using: GET "api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }
    catch {
        res.status(500).send("internal server error")
    }
})

//Router 2:Add a note using POST: '/api/notes/addnote'. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //If there are errors, return Bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({ title, description, tag, user: req.user.id })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }

})


// Route 3:Update a note using PUT://api/notes/updatenote/:id.  Login required

router.put('/updatenotes/:id', fetchuser, async(req, res)=>{
    const{title, description, tag}= req.body;
    try {
        
   
    //create a newNote object

    const newNote={};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description= description;
    }
    if(tag)
    {
        newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note)
    {
        res.status(404).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.log(error.message)
        res.status(500).send("Internal Server Error")
        
}
})


// Route 4:Delete a note using DELETE : /api/notes/deletenote/:id.  Login required

router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
   
  try {
      
  
    // find the note to be deleted and delete it
    let note=await Note.findById(req.params.id);
    if(!note)
    {
        res.status(404).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not Allowed")
    }

   note = await Note.findByIdAndDelete(req.params.id);
    res.json({"SUCCESS":"NOTE HAS BEEN DELETED", note:note});
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
}
})







module.exports = router;