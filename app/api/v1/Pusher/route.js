// app/api/v1/Pusher/route.js
import pusher from "@/app/pusher";

// Named export for the POST method
export async function POST(req) {
    try {
        const { message, sender, receiver } = await req.json(); // Extract message, sender, and receiver from the request body

        // Trigger the Pusher event with receiver information
        await pusher.trigger("my-channel", "my-event", {
            message,
            sender,
            receiver,
        });

        return new Response("Message sent successfully", { status: 200 });
    } catch (error) {
        return new Response("Error sending message", { status: 500 });
    }
}
