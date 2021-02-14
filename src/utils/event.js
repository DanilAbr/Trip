const getTime = (date) => {
  return new Intl.DateTimeFormat(`ru`, {
    hour: `numeric`,
    minute: `numeric`,
  }).format(new Date(date));
};

const getFormattedDuration = (start, end) => {
  const endMs = new Date(end).getTime();
  const startMs = new Date(start).getTime();
  const durationMs = endMs - startMs;

  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(durationMs / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(durationMs / (1000 * 60)) % 60;

  return `${days ? `${days}D` : ``}
          ${hours ? `${hours}H` : ``}
          ${minutes ? `${minutes}M` : ``}`;
};

const getDatetime = (date) => new Date(date).toISOString().slice(0, 16);

const getDuration = (obj) => new Date(obj.dateTo).getTime() - new Date(obj.dateFrom).getTime();

const sortPrice = (a, b) => a.basePrice - b.basePrice;
const sortTime = (a, b) => getDuration(a) - getDuration(b);
const sortByDate = (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom);

export {
  sortByDate,
  sortTime,
  sortPrice,
  getDatetime,
  getDuration,
  getFormattedDuration,
  getTime,
};
