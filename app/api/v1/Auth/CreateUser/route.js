import connectDB from "@/app/lib/config/mongodb";
import UserModel from "@/app/lib/models/UserModel";
const { NextResponse } = require("next/server");
import bcrypt from 'bcryptjs'; // Ensure bcrypt is installed
const saltRounds = 10;

const LoadDb = async () => {
    await connectDB();
};
LoadDb();
export async function POST(req) {
    const body = await req.json();
    const { name, email, password, gender } = body;

    if (!name || !email || !password || !gender) {
        return NextResponse.json({ success: false, msg: "All fields are required" }, { status: 400 });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, msg: "Email already exists" }, { status: 400 });
        } const data = {
            name,
            email,
            password: hashedPassword,
            gender,

        };

        const UserData = await UserModel.create(data);
        return NextResponse.json({ success: true, msg: "User Added", UserData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error adding User" + error }, { status: 500 });
    }
}
