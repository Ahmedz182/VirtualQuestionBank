// app/api/v1/Pusher/route.js
import pusher from "@/app/pusher";
import Message from "@/app/lib/models/ChatModel";
import connectDB from "@/app/lib/config/mongodb";

// Handler for the POST request
export async function POST(req) {
    try {
        // Ensure database connection is established
        await connectDB();

        const { message, sender, receiver } = await req.json();

        // Save the message in the database
        const savedMessage = await Message.create({
            message,
            sender,
            receiver,
            time: new Date(),
        });

        // Trigger the Pusher event with the message details
        await pusher.trigger("my-channel", "my-event", {
            message: savedMessage.message,
            sender: savedMessage.sender,
            receiver: savedMessage.receiver,
            time: savedMessage.time,
        });

        return new Response("Message sent and saved successfully", { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response("Error sending message", { status: 500 });
    }
}
