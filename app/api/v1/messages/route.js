// app/api/v1/messages/route.js
import connectDB from "@/app/lib/config/mongodb";
import Message from "@/app/lib/models/ChatModel";

// Handle POST requests to save a new message
export async function POST(req) {
    await connectDB();

    try {
        const { userEmail, sender, receiver, message } = await req.json();

        // Ensure required fields are present
        if (!userEmail || !sender || !receiver || !message) {
            return new Response("Missing required fields", { status: 400 });
        }

        // New message object to be added to messages array
        const newMessage = {
            sender,
            receiver,
            message,
            time: new Date(),
        };

        // Use upsert to update or create a document with userEmail
        const result = await Message.findOneAndUpdate(
            { userEmail }, // Filter by userEmail at document root level
            {
                $setOnInsert: { userEmail }, // Ensure userEmail is set if document is new
                $push: { messages: newMessage } // Add message to messages array
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error saving message:", error);
        return new Response("Error saving message", { status: 500 });
    }
}

// Handle GET requests to fetch messages for a specific user
export async function GET(req) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("email"); // Extract email from query parameters

        if (!userEmail) {
            return new Response("Email parameter is required", { status: 400 });
        }

        // Fetch the messages for the specified user
        const userMessages = await Message.findOne({ userEmail });

        if (!userMessages) {
            return new Response(JSON.stringify({ messages: [] }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(userMessages), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return new Response("Error fetching messages", { status: 500 });
    }
}
