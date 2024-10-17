import connectDB from "@/app/lib/config/mongodb";
import ManagementSchema from "@/app/lib/models/AdminModel";
const { NextResponse } = require("next/server");
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');
const KEY_jwt = "iamZackKnight";


const LoadDb = async () => {
    await connectDB();
};
LoadDb();
export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email && !password) {
            return NextResponse.json({ success: false, msg: "Email and password are required" }, { status: 400 });
        }

        const user = await ManagementSchema.findOne({ email });


        if (!user) {
            return NextResponse.json({ success: false, msg: "Invalid email or password" }, { status: 401 });
        }

        // const hashPass = await bcrypt.hash(password, 10);
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            //create JWT token
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
                KEY_jwt, // replace with a strong secret or use environment variables
                { expiresIn: '1h' } // Token expiration time (1 hour in this case)
            );

            return NextResponse.json({
                success: true,
                msg: "Login successful",
                token: token, // Include the JWT token in the response
                role: user.role,
                AdminDetail: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, msg: "Invalid email or password" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ success: false, msg: "Error logging in" }, { status: 500 });
    }
}