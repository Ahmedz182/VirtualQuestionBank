import { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
    questionTitle: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctOption: {
        type: String,
        required: true
    }
});

const QuizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,

    },
    totalPlayed: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
    },
    imgUrl: {
        type: String,
    },
    questions: {
        type: [QuestionSchema],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Quiz' });

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;
