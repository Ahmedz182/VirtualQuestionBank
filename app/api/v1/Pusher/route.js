import pusher from "@/app/pusher"; // Import your Pusher instance
import Message from "@/app/lib/models/ChatModel"; // Import your Mongoose model
import connectDB from "@/app/lib/config/mongodb"; // Import your MongoDB connection

// Handler for the POST request
export async function POST(req) {
    try {
        // Ensure database connection is established
        await connectDB();

        const { message, sender, receiver } = await req.json();

        // Create a new message object
        const newMessage = {
            message,
            sender,
            receiver,
            time: new Date(),
        };

        // 1. Save the message in the sender's database entry
        await Message.findOneAndUpdate(
            { userEmail: sender }, // Find the user by sender's email
            { $push: { messages: { ...newMessage, direction: "outgoing" } } }, // Save as an outgoing message
            { upsert: true, new: true } // Create the document if it doesn't exist, and return the new document
        );

        // 2. Save the message in the receiver's database entry
        await Message.findOneAndUpdate(
            { userEmail: receiver }, // Find the user by receiver's email
            { $push: { messages: { ...newMessage, direction: "incoming" } } }, // Save as an incoming message
            { upsert: true, new: true } // Create the document if it doesn't exist, and return the new document
        );

        // Trigger the Pusher event with the message details
        await pusher.trigger("my-channel", "my-event", newMessage);

        return new Response("Message sent and saved successfully", { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response("Error sending message", { status: 500 });
    }
}
