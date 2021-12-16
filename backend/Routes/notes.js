const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../model/Notes');

//Route 1: get all the notes using: GET "api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch {
        res.status(500).send("internal server error")
    }
})

//Router 2:Add a note using POST: '/api/notes/addnote'. Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description', 'Description must be atleast 5 characters'.)isLength({min: 5}),
], async(req,res)=>{
    try{

        const {title, description, tag} = req.body;
        //If there are errors, return Bad request and the errors

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    }

})

module.exports = router;