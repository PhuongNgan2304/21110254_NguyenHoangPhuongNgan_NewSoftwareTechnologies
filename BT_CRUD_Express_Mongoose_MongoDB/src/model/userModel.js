import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    email:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    phoneNumber:{
        type: String,
        required: true
    },
    gender:{
        type: Boolean,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    roleID:{
        type: String,
        required: false
    },
    positionID:{
        type: String,
        required: false
    }
})

export default mongoose.model("users", userSchema);