const express = require('express');

const bcrypt = require('bcryptjs')
const User = require('../model/User')

const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'harryisagoodboy';
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a user using :POST: api/auth/createuser, no login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })

],
    async (req, res) => {
        //if there are errors return bad request and errors
let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error121");
            return res.status(400).json({ success,errors: errors.array() });
        }
        //check whether the user this email already exists
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry a user with this email already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //create a new user

            user = await User.create({
                name: req.body.name,
                password: secPass, 
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;



            res.json({success, authtoken })
        } catch (error) {
            console.log(error.message);
            res.status(500).send("error occured")
        }

    })
//Authenticating a user using:POST "/api/auth/login",no login required

router.post('/login', [
    body('email', 'Enter a valid email ').isEmail(),
    body('password', 'Password cannot be blank').exists(),

],
    async (req, res) => {

        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("hello there")
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success=false
                return res.status(400).json({success, error: "please try to login with correct credential" });

            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success=false
                return res.status(400).json({ success,error: "please try to login with correct credential" });



            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({ success, authtoken });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    })

//get logged in user detail using: POST "/api/auth/getuser".LOgin required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
       const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router