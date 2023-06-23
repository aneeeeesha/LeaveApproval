
const mongoose = require('mongoose');

const DB = 'mongodb+srv://mernUser:mernUser@cluster0.9oaknz9.mongodb.net/mern';
mongoose.connect(DB).then(()=>{console.log("CONNECTEDDD TO DB")}).catch((err)=>console.log("ERROR CONNECTING TO DB",err));

