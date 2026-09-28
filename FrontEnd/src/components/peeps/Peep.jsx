import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** Y's own colours, so each person keeps the same avatar colour everywhere. */
const AVATAR_COLOURS = ["#571429", "#d18d3d", "#dc356d", "#8a3b5c", "#b0623a"];

const avatarColour = (username = "") =>
  AVATAR_COLOURS[
    [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      AVATAR_COLOURS.length
  ];

const Peep = ({ peep }) => {
  const { username, date, message } = peep;
  const nameId = `peep-${peep._id ?? username}-${date}`;

  return (
    <div className="mx-auto max-w-xl px-4">
      <article
        aria-labelledby={nameId}
        className="flex gap-3 px-4 py-4 my-3 primary secondary-bg rounded-2xl shadow-md shadow-black/20"
      >
        <div
          aria-hidden="true"
          className="grid place-items-center shrink-0 w-10 h-10 rounded-full text-white font-bold"
          style={{ backgroundColor: avatarColour(username) }}
        >
          {username?.[0]?.toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 text-sm">
            <span id={nameId} className="font-semibold truncate">
              {username}
            </span>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <time dateTime={date} className="opacity-60 text-xs whitespace-nowrap">
              {dayjs(date).fromNow()}
            </time>
          </div>
          <p className="mt-1 text-[15px] leading-relaxed break-words">
            {message}
          </p>
        </div>
      </article>
    </div>
  );
};

export default Peep;
