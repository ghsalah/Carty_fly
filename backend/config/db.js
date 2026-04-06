import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("ERROR: MONGO_URI is missing in environment variables.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    // No process.exit(1) on Vercel
  }
};

export default connectDB;
