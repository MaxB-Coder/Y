import PostPeeps from "./PostPeeps";
import HeaderPeeps from "./HeaderPeeps.jsx";
import Peep from "./Peep.jsx";
import PeepModel from "../utils/peep.model";
import useAuth from "../../hooks/useAuth";

export const PeepPage = ({ peepData }) => {
  const { auth } = useAuth();
  const sortedPeeps = peepData.sort(
    (a, b) => new Date(b["$date"]) - new Date(a["$date"])
  );

  const populatePeeps = () => {
    const peeps = sortedPeeps;
    if (peeps?.length > 0) {
      const displayPeeps = peeps.map((currentPeep) => {
        const peep = new PeepModel(
          currentPeep.username,
          currentPeep.$date,
          currentPeep.message,
          currentPeep._id
        );
        return <Peep peep={peep} key={currentPeep._id} />;
      });
      return displayPeeps;
    }
  };

  return (
    <>
      <HeaderPeeps />
      <div className="pt-4">{populatePeeps()}</div>
      {auth?.username ? <PostPeeps /> : null}
    </>
  );
};

export default PeepPage;
