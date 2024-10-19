import connectDB from "@/app/lib/config/mongodb";
import UserModel from "@/app/lib/models/UserModel";
const { NextResponse } = require("next/server");
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';


const KEY_jwt = "iamZackKnight";
const LoadDb = async () => {
    await connectDB();
};
LoadDb();
export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const profile = searchParams.get("profile");
    const UserCount = searchParams.get("UserCount"); // Fetch UserCount query parameter

    try {

        if (UserCount === 'true') {
            const totalUsers = await UserModel.countDocuments({});
            return NextResponse.json(
                {
                    success: true,
                    msg: "User Counts Fetched",
                    user: totalUsers,
                },
                { status: 200 }
            );
        }

        const { email, password } = await req.json();

        if (!email && !password) {
            return NextResponse.json({ success: false, msg: "Email and password are required" }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, msg: "Invalid email or password" }, { status: 401 });
        }
        if (user) {
            if (profile === 'true') {
                return NextResponse.json(
                    {
                        success: true,
                        msg: "Prfile Data Fetched",
                        performance: user.performance

                    },
                    { status: 200 }
                );
            }
        }




        // const hashPass = await bcrypt.hash(password, 10);
        const isMatch = await bcrypt.compare(password, user.password);


        if (isMatch) {


            return NextResponse.json(
                {
                    success: true,
                    msg: "Login successful",
                    userDetail: {
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                    }
                },
                { status: 200 }
            );




        } else {
            return NextResponse.json(
                {
                    success: false,
                    msg: "Invalid email or password"
                },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ success: false, msg: "Error logging in" }, { status: 500 });
    }
}

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1]; // Get token from the Authorization header

    try {
        // Verify the token
        if (!token) {
            return NextResponse.json({ success: false, msg: "No token provided" }, { status: 401 });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, KEY_jwt);
        } catch (error) {
            return NextResponse.json({ success: false, msg: "Invalid token" }, { status: 401 });
        }

        // If token is valid, return all users
        const users = await UserModel.find({}); // Fetch all users
        return NextResponse.json(
            {
                success: true,
                msg: "Users fetched successfully",
                users: users, // Return list of users
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, msg: "Error processing request" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email"); // Get the email parameter from the request

        if (!email) {
            return NextResponse.json(
                { success: false, msg: "Email is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, msg: "User not found" },
                { status: 404 }
            );
        }

        // Delete the user by email
        await UserModel.deleteOne({ email });

        return NextResponse.json(
            { success: true, msg: `User with email ${email} deleted successfully` },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { success: false, msg: "Error deleting user" },
            { status: 500 }
        );
    }
}
