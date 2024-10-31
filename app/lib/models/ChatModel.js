import { Schema, models, model } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

const userMessageSchema = new Schema(
    {
        userEmail: {
            type: String,
            required: true,
            unique: true, // Ensures only one document per user
        },
        messages: [messageSchema], // Array of messages for this user
    },
    { collection: 'Messages' } // Use a specific collection name
);

// This will prevent model recompilation in case of hot reload
const Message = models.Messages || model('Messages', userMessageSchema);

export default Message;
