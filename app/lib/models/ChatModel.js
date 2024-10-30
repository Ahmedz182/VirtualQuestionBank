import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
    {

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
    },
    { collection: 'Messages' }
);

const Message = models.Messages || model('Messages', MessageSchema);

export default Message;
