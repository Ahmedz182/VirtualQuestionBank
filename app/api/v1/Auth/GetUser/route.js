import connectDB from "@/app/lib/config/mongodb";
import UserModel from "@/app/lib/models/UserModel";
const { NextResponse } = require("next/server");
import bcrypt from 'bcryptjs';

const LoadDb = async () => {
    await connectDB();
};
LoadDb();
export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const profile = searchParams.get("profile");
    try {
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