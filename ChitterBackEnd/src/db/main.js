import mongoose from "mongoose";

const main = async () => {
  console.log(`Connecting to ${process.env.DBURI}`);
  try {
    await mongoose.connect(process.env.DBURI);
    console.log(`Connected to ${process.env.DBURI}`);
  } catch (e) {
    console.log(e);
  }
};

export default main;
