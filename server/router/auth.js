const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const authenticate = require('../middleware/authenticate');
require('../db/connect');

const User = require("../models/userScheme");

router.get('/', (req, res) => {
    res.send("IDU AUTH");
})
router.post('/signin', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Enter both the details" });
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        if (userLogin) {
            console.log("About to generate token pa");
            const token = await userLogin.generateAuthToken();
            
            res.cookie("jwtoken", token);
            
            if (userLogin.password == password)
                res.json({ message: "LOGIN SUCCESSFULLLLLLLLY" });
            else
                res.json({ message: "PASSWORD ENLE" });
        }
        else {
            res.json({ message: "REGISTER MAADLE" });
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.post('/signup', (req, res) => {

    const { name, email, phone, room_no, course, year, password, cpassword } = req.body;

    if (!name || !email || !phone || !room_no || !course || !year || !password || !cpassword) {
        res.status(202).json({ "error": "Please fill all the data" });
    }

    User.findOne({ email: email }).then((userExist) => {
        if (userExist) { return res.status(422).json({ error: "User already exists" }); }

        const user = new User({ name, email, phone, room_no, course, year, password, cpassword });
        user.save().then(() => { res.status(501).json({ message: "User registered successfully" }) })
            .catch((err) => res.status(500).json({ error: "Failed to register" }));
    }
    ).catch((err) => console.log(err));


    console.log(req.body);
    // res.json({ message: req.body });
});




router.post('/reqs',async (req, res) => {
    try {
        const { email, from, to, reason, approved } = req.body;
        let reqData ;
        
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
              reqData = userLogin.addReq({ "from": from, "to": to, "reason": reason ,"approved":approved})
             }

             console.log(reqData);
    }
    catch(err){
        console.log(err)
    }
}
    // res.json({ message: req.body });
);

router.post('/approveLeave',async (req, res) => {
    try {
        const { email,index } = req.body;
        let reqData ;
        
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
              reqData = userLogin.approveLeave({ "index": index,"status":true})
             }

             console.log(reqData);
    }
    catch(err){
        console.log(err)
    }
}
    // res.json({ message: req.body });
);


router.get('/activity', authenticate,(req, res) => {
    if(req.admin){
        console.log("SENT ADMIN");
        res.send(req.allUsers);
       
        
    }
    else{
    res.send(req.rootUser);}
});
module.exports = router;