import mongoose from "mongoose";

const peepSchema = new mongoose.Schema({
  username: String,
  $date: Date,
  message: String,
});

const Peep = mongoose.model("Peep", peepSchema);

export default Peep;
