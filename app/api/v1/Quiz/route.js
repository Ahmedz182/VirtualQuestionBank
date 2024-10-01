import connectDB from "@/app/lib/config/mongodb";
import QuizModel from "@/app/lib/models/QuizModel";
const { NextResponse } = require("next/server");

const LoadDb = async () => {
    await connectDB();
};
LoadDb();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get("id");
        const subject = searchParams.get("subject");  // Changed to lowercase 'subject'

        if (_id) {
            // Fetch a single quiz by its ID
            const quiz = await QuizModel.findById(_id);
            if (!quiz) {
                return NextResponse.json({ success: false, msg: "Quiz not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, quiz }, { status: 200 });
        } else if (subject) {
            // Fetch quizzes based on the subject
            console.log(subject);
            const quiz = await QuizModel.find({ subject }); // Use object format to query by subject
            return NextResponse.json({ success: true, totalQuiz: quiz.length, quiz }, { status: 200 });
        } else {
            // Fetch all quizzes if no specific ID or subject is provided
            const quiz = await QuizModel.find();
            return NextResponse.json({ success: true, totalQuiz: quiz.length, quiz }, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return NextResponse.json({ success: false, msg: "Error fetching quiz", error: error.message }, { status: 500 });
    }

}

export async function POST(req) {
    const body = await req.json();
    const data = {
        title: body.title,
        subject: body.subject,
        desc: body.desc,
        difficulty: body.difficulty,
        tags: body.tags,
        questions: body.questions,
        imgUrl: body.imgUrl
    };

    try {
        const quizData = await QuizModel.create(data);
        console.log("Quiz Saved");
        return NextResponse.json({ success: true, msg: "Quiz Added", quizData }, { status: 201 });
    } catch (error) {
        console.error("Error saving quiz:", error);
        return NextResponse.json({ success: false, msg: "Error adding quiz" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get("id");
        const updatePlayTime = searchParams.get("playTime");


        if (!_id) {
            return NextResponse.json({ success: false, msg: "Quiz ID is required." }, { status: 400 });
        }

        // Check if playTime is set to true
        if (updatePlayTime === 'true') {
            // Fetch the current quiz data to get the existing totalPlayed
            const quiz = await QuizModel.findById(_id);
            if (!quiz) {
                return NextResponse.json({ success: false, msg: "Quiz not found." }, { status: 404 });
            }

            const currentPlayTime = quiz.totalPlayed || 0; // Use existing totalPlayed or default to 0
            const newPlayTime = currentPlayTime + 1; // Increment totalPlayed by 1

            // Update only the totalPlayed field
            const updatedQuiz = await QuizModel.findByIdAndUpdate(
                _id,
                { totalPlayed: newPlayTime }, // Update totalPlayed only
                { new: true }
            );

            return NextResponse.json({ success: true, msg: "Total Played updated successfully.", quizData: updatedQuiz }, { status: 200 });
        }

        // For other updates when playTime is not set
        const body = await req.json(); // This assumes body is sent when updating other fields

        const data = {
            title: body.title,
            subject: body.subject,
            desc: body.desc,
            difficulty: body.difficulty,
            createdBy: body.createdBy,
            tags: body.tags,
            questions: body.questions,
            imgUrl: body.imgUrl
        };

        const updatedQuiz = await QuizModel.findByIdAndUpdate(_id, data, { new: true });

        if (!updatedQuiz) {
            return NextResponse.json({ success: false, msg: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Quiz updated successfully.", quizData: updatedQuiz }, { status: 200 });

    } catch (error) {
        console.error("Error updating quiz:", error);
        return NextResponse.json({ success: false, msg: "Error updating quiz", error: error.message || error }, { status: 500 });
    }
}



export async function DELETE(req) {
    try {
        // Extracting query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get("id");

        if (!_id) {
            return NextResponse.json({ success: false, msg: "Quiz ID is required." }, { status: 400 });
        }

        const result = await QuizModel.findByIdAndDelete(_id);

        if (!result) {
            return NextResponse.json({ success: false, msg: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Quiz Deleted Successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error Deleting quiz:", error);
        return NextResponse.json({ success: false, msg: "Error Deleting quiz" }, { status: 500 });
    }
}





