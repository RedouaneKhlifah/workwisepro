import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (process.env.NODE_ENV !== "production") {
            // Terminate the process in development mode
            process.exit(1);
        } else {
            // Handle error in production mode accordingly
            throw error;
        }
    }
};

export default connectDB;
