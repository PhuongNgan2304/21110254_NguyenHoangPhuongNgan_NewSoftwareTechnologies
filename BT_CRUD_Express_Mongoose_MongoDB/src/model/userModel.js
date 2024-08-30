import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";


// Create a schema with an explicit id field
const userSchema = new mongoose.Schema({
    email: {
        type: String,  
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    roleID: {
        type: String,
        required: false
    },
    positionID: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Optional: Adds createdAt and updatedAt fields
});

// // Optional: Auto-increment functionality (if needed)
// const autoIncrement = mongooseSequence(mongoose);
// userSchema.plugin(autoIncrement, {inc_field: "customid"}): chỉ dùng khi tự tạo id bằng tay

export default mongoose.model("User", userSchema);
