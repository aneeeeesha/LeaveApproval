const jwt = require('jsonwebtoken');
const User = require("../models/userScheme");



const Authenticate = async  (req,res,next)=>{
    try{
        console.log("Entered Auth");
        console.log(req.cookies);
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        console.log("Verified token");

        const rootUser = await User.findOne({_id:verifyToken, "tokens.token":token});
        console.log(rootUser);

        if(!rootUser){throw new Error('User not found');}
        if(rootUser.email == "admin"){
            console.log("ADMINNN");
            req.token = token; 
            req.rootUser = rootUser;
            req.allUsers  = await User.find(); 
            req.admin = true;
        }
        else
        {req.token = token;
        req.rootUser = rootUser;}

        next();
    }catch(err){
        res.status(401).send("Unauthorized token");
        console.log(err);
    }
}

module.exports = Authenticate;