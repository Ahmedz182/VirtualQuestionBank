import { Schema, models, model } from "mongoose";

const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Subject' });

const Subject = models.Subject || model('Subject', SubjectSchema);

export default Subject;

