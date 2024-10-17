import { Schema, models, model } from "mongoose";

const PerformanceSchema = new Schema({
    totalPlayed: {
        type: Number,
        required: true
    },
    Win: {
        type: Number,
        // required: true
    },
    loss: {
        type: Number,
        // required: true
    },
    lastPlayed: {
        type: String,
        required: true
    },
    lastPlayedScore: {
        type: String,
        required: true
    },

});

const UserSchema = new Schema({
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
    gender: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "User"
    },
    performance: {
        type: [PerformanceSchema]

    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'User' });

const User = models.User || model('User', UserSchema);

export default User;
