import { getPeepsService } from "../services/peep.service.js";
import { postPeepService } from "../services/peep.service.js";

export const getPeeps = async (req, res) => {
  try {
    const peeps = await getPeepsService();
    res.json(peeps);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postPeep = async (req, res) => {
  try {
    const postPeep = await postPeepService(req.body);
    res.status().json(postPeep);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
