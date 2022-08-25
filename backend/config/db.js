import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Mongodb Connected: ${db.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`ERROR: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
