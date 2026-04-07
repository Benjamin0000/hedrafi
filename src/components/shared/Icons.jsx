const DiscordIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.63 7A17.83 17.83 0 0 0 15 5.5l-.32.77C13.2 6 11.8 6 10.35 6.27L10 5.5A17.83 17.83 0 0 0 6.37 7 18.1 18.1 0 0 0 4 17.44s2 3.12 6 3.56c.5-.63.93-1.33 1.3-2.07a10.6 10.6 0 0 1-3.66-1.78l.38-.32a13 13 0 0 0 11.96 0l.38.32a10.6 10.6 0 0 1-3.66 1.78c.37.74.8 1.44 1.3 2.07 4-.44 6-3.56 6-3.56A18.1 18.1 0 0 0 18.63 7Z" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
  </svg>
);

export {DiscordIcon as Discord};