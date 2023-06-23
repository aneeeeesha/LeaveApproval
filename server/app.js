const express = require('express');
const cookieParser = require('cookie-parser')


const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});

const app = express();
app.use(cookieParser())

//The below code connects to the MongoDB
require('./db/connect');

app.use(express.json());
app.use(require('./router/auth'));

app.get('/', (req, res) => {
    res.send("Hello from the world");
});

app.get('/about', (req, res) => {
    res.send("Hello from the about");
});

// app.get('/activity', (req, res) => {
//     res.send("Hello from the contact");
// });

app.get('/signin', (req, res) => {
    res.send("Hello from the signin");
});

app.get('/signup',(req,res)=>{
    res.send("Hello from the signup");
    });

app.listen(3000, () => {
    console.log("SERVER RUNNING AT P No 3000");
    
})


