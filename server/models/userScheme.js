const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    room_no: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    leave_reqs: [
        { leave_req: { 
            from: { type: String, required: true } ,
            to:{ type: String, required: true },
            reason:{ type: String, required: true },
            approved:{type:Boolean}
                     } 
        }
                ]  
})


userScheme.methods.generateAuthToken = async function () {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("Returning the token pa");
    return token;
    

}

userScheme.methods.addReq = async function (e) {
    console.log(e);
    const leaveRequest = {
        from: e.from,
        to: e.to,
        reason: e.reason,
        approved: e.approved
      };
      console.log(leaveRequest);
     this.leave_reqs = this.leave_reqs.concat({ leave_req: leaveRequest });
    await this.save();
    console.log("Saved");
    return leaveRequest;

}

userScheme.methods.approveLeave = async function (e) {
    if (e.index < 0 || e.index >= this.leave_reqs.length) {
        throw new Error('Invalid leave request index');
      }
    console.log(this.leave_reqs[e.index].leave_req.approved);
    this.leave_reqs[e.index].leave_req.approved = e.status;
    await this.save();
    console.log("Saved");
    

}
const User = mongoose.model('USER', userScheme);

module.exports = User;