import connectDB from "@/app/lib/config/mongodb";
import ManagementSchema from "@/app/lib/models/AdminModel";
const { NextResponse } = require("next/server");
import bcrypt from 'bcryptjs';
const saltRounds = 10;

const LoadDb = async () => {
    await connectDB();
};
LoadDb();
export async function POST(req) {
    const body = await req.json();
    const { name, email, password, gender, role, isAdmin } = body;

    const lowerEmail = email.toLowerCase();
    if (!name || !lowerEmail || !password || !gender) {
        return NextResponse.json({ success: false, msg: "All fields are required" }, { status: 400 });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Check if the email already exists
        const existingUser = await ManagementSchema.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ success: false, msg: "Email already exists" }, { status: 400 });
        }
        // Prepare user data
        const data = {
            name,
            email: lowerEmail, // Use the lowercased email
            password: hashedPassword, // Use hashed password
            gender,
            role,
            isAdmin
        };

        // Save user to the database
        const AdminData = await ManagementSchema.create(data);
        console.log("Admin/Staff Saved");
        return NextResponse.json({ success: true, msg: "Admin/Staff Added", AdminData }, { status: 201 });
    } catch (error) {
        console.error("Error saving User:", error);
        return NextResponse.json({ success: false, msg: "Error adding Admin/Staff" }, { status: 500 });
    }
}
