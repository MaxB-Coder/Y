/** Y's logo: a drawn Y on a pink-to-maroon tile, the same on every device. */
function Logo() {
  return (
    <span className="logo-tile" role="img" aria-label="Y">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 4.5 12 12l6.5-7.5M12 12v7.5" />
      </svg>
    </span>
  );
}

export default Logo;
