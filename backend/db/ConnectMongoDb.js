import mongoose from "mongoose";

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Success: Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectMongoDB;
