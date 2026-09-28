import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** Y's own colours, light enough for the dark timeline; each person keeps theirs. */
const AVATAR_COLOURS = ["#8a3b5c", "#d18d3d", "#dc356d", "#b0623a", "#a8466b"];

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
        className="flex gap-3 px-4 py-4 my-3 surface rounded-2xl"
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
