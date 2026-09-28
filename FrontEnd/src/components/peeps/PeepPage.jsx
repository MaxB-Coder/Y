import PostPeeps from "./PostPeeps";
import HeaderPeeps from "./HeaderPeeps.jsx";
import Peep from "./Peep.jsx";
import PeepModel from "../utils/peep.model";
import useAuth from "../../hooks/useAuth";

export const PeepPage = ({ peepData, onPosted }) => {
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
      {/* Room at the end, so the post button never covers the last peep */}
      <div className="pt-4 pb-20">{populatePeeps()}</div>
      {auth?.username ? <PostPeeps onPosted={onPosted} /> : null}
    </>
  );
};

export default PeepPage;
