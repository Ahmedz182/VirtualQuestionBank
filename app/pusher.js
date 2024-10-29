// pusher.js
import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1886972",
    key: "a788034843d7dc2bf49e",
    secret: "9f6dbe739c132acdaa4a",
    cluster: "ap2",
    useTLS: true
});

export default pusher;
