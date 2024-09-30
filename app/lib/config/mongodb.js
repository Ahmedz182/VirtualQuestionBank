import mongoose from 'mongoose';



const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return true;
    }

    try {
        await mongoose.connect(process.env.DB_URL || process.env.localURL);
        console.log("Database Connected.!");
        return true;
    } catch (error) {
        console.log("Database Connection Failed.", error);
    }
}


export default connectDB;