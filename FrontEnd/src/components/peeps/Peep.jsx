import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Peep = ({ peep }) => {
  const { username, date, message } = peep;

  const relativeDate = dayjs(date).fromNow();

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-start-3 col-end-6 px-3 py-2 my-3 text-center primary secondary-bg border rounded-lg">
        <div className="text-sm">{username}</div>
        <div className="text-xs pt-1">{relativeDate}</div>
        <div className="text-left text-xs pt-2">{message}</div>
      </div>
    </div>
  );
};

export default Peep;
