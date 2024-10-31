import pusher from "@/app/pusher"; // Import your Pusher instance
import Message from "@/app/lib/models/ChatModel"; // Import your Mongoose model
import connectDB from "@/app/lib/config/mongodb"; // Import your MongoDB connection

// Handler for the POST request
export async function POST(req) {
    try {
        // Ensure database connection is established
        await connectDB();

        const { message, sender, receiver } = await req.json();

        // Save the message in the database under the user's email
        const user = await Message.findOneAndUpdate(
            { userEmail: sender }, // Find the user by sender's email
            { $push: { messages: { message, sender, receiver, time: new Date() } } }, // Push the new message into the messages array
            { upsert: true, new: true } // Create the document if it doesn't exist, and return the new document
        );

        // Trigger the Pusher event with the message details
        await pusher.trigger("my-channel", "my-event", {
            message: message,
            sender: sender,
            receiver: receiver,
            time: new Date(),
        });

        return new Response("Message sent and saved successfully", { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response("Error sending message", { status: 500 });
    }
}
