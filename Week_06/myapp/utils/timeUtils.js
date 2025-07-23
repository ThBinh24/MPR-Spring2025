export const millisecondsToHuman = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .join(':');
};
