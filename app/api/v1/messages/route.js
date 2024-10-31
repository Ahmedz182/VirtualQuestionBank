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

        // 1. Update the sender's message document (for user messages)
        await Message.findOneAndUpdate(
            { userEmail: sender }, // Filter by sender's userEmail
            {
                $setOnInsert: { userEmail: sender }, // Ensure sender's userEmail is set if document is new
                $push: { messages: { ...newMessage, direction: "outgoing" } }, // Push the new message to the messages array
            },
            { new: true, upsert: true }
        );

        // 2. Update the receiver's message document (to include the incoming message)
        await Message.findOneAndUpdate(
            { userEmail: receiver }, // Filter by receiver's userEmail
            {
                $setOnInsert: { userEmail: receiver }, // Ensure receiver's userEmail is set if document is new
                $push: { messages: { ...newMessage, direction: "incoming" } } // Save the message as received
            },
            { new: true, upsert: true }
        );

        return new Response(JSON.stringify({ message: "Message saved successfully" }), {
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
        const fetchAll = searchParams.get("all"); // Extract email from query parameters
        // If 'all' is passed, fetch all messages
        if (fetchAll === "all") {
            const allMessages = await Message.find(); // Fetch all messages from the database

            return new Response(JSON.stringify(allMessages), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Ensure an email is provided if not fetching all
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
