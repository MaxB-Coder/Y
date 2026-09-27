import mongoose from "mongoose";

const main = async () => {
  console.log(`Connecting to database...`);
  try {
    await mongoose.connect(process.env.DBURI);
    console.log(`Connected to database`);
  } catch (e) {
    console.log(e);
  }
};

export default main;
