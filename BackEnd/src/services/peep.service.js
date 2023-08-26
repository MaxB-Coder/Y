import Peep from "../models/peep.model.js";

export const getPeepsService = async (req, res) => {
  try {
    return await Peep.find();
  } catch (e) {
    throw e;
  }
};

export const postPeepService = async (req, res) => {
  try {
    await Peep.create(req);
    return res;
  } catch (e) {
    console.log("Error at service: ", e);
    throw e;
  }
};
