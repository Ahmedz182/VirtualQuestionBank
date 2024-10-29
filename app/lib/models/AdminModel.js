import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
    userId: {
        type: String, // Use user ID for identification
        required: true
    },
    messages: [{
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const ManagementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Messages: [MessageSchema], // Use the MessageSchema here

    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Admin' });

const Admin = models.Admin || model('Admin', ManagementSchema);

export default Admin;
