// app/api/v1/messages/route.js
import connectDB from "@/app/lib/config/mongodb";
import Message from "@/app/lib/models/ChatModel";

// Named export for the GET method
export async function GET(req) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("email"); // Filter by the logged-in user's email
        if (!userEmail) {
            return new Response("User email is required", { status: 400 });
        }

        // Fetch messages where the user is either the sender or the receiver
        const messages = await Message.find({
            $or: [
                { sender: userEmail },
                { receiver: userEmail }
            ]
        }).sort({ time: 1 });

        return new Response(JSON.stringify(messages), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return new Response("Error fetching messages", { status: 500 });
    }
}
