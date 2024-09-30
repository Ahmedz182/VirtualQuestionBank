import connectDB from "@/app/lib/config/mongodb";
import UserModel from "@/app/lib/models/UserModel";
import { NextResponse } from "next/server";

// Ensure database connection
const LoadDb = async () => {
    await connectDB();
};
LoadDb();

export async function PUT(req) {
    const { searchParams } = new URL(req.url);
    const Gamewin = searchParams.get("Gamewin");
    const loss = searchParams.get("loss");

    try {
        // Destructure performance fields and email from the request body
        const { email, lastPlayed, lastPlayedScore } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
        }

        // Check if performance field exists, otherwise initialize it
        if (user.performance.length === 0) {
            user.performance.push({});
        }


        // Increment totalPlayed by 1, initializing it to 0 if necessary
        user.performance[0].totalPlayed = (user.performance[0].totalPlayed ?? 0) + 1;
        if (Gamewin === 'true') {
            // Initialize Win to 0 if it is not set
            user.performance[0].Win = user.performance[0].Win ?? 0;

            // Increment Win by 1
            user.performance[0].Win += 1;
        }

        if (loss === 'true') {
            user.performance[0].loss = user.performance[0].loss ?? 0;
            user.performance[0].loss += 1;
        }
        user.performance[0].lastPlayed = lastPlayed ?? user.performance[0].lastPlayed;
        user.performance[0].lastPlayedScore = lastPlayedScore ?? user.performance[0].lastPlayedScore;

        // Save the updated user document
        await user.save();

        return NextResponse.json({
            success: true,
            msg: "Performance updated successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating performance:", error);
        return NextResponse.json({ success: false, msg: "Error updating performance" }, { status: 500 });
    }
}
