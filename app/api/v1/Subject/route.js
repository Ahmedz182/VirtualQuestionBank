import connectDB from "@/app/lib/config/mongodb";
import SubjectModel from "@/app/lib/models/SubjectModel";
const { NextResponse } = require("next/server");

const LoadDb = async () => {
    await connectDB();
};
LoadDb();

export async function GET(req) {
    try {
        const subjects = await SubjectModel.find();
        return NextResponse.json({ success: true, totalSubject: subjects.length, subjects }, { status: 200 });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return NextResponse.json({ success: false, msg: "Error fetching subjects" }, { status: 500 });
    }
}

export async function POST(req) {
    const body = await req.json();
    const data = {
        title: body.title,
        desc: body.desc,
        imgUrl: body.imgUrl
    };

    try {
        const subjectData = await SubjectModel.create(data);
        console.log("Subject Saved");
        return NextResponse.json({ success: true, msg: "Subject Added", subjectData }, { status: 201 });
    } catch (error) {
        console.error("Error saving subject:", error);
        return NextResponse.json({ success: false, msg: "Error adding subject" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        // Extracting query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get("id");

        if (!_id) {
            return NextResponse.json({ success: false, msg: "Subject ID is required." }, { status: 400 });
        }

        const result = await SubjectModel.findByIdAndDelete(_id);

        if (!result) {
            return NextResponse.json({ success: false, msg: "Subject not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Subject Deleted Successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error Deleting subject:", error);
        return NextResponse.json({ success: false, msg: "Error Deleting subject" }, { status: 500 });
    }
}
