const addZero = number => number >= 10 ? number : '0' + number;

const parseDate = string => {
  const date = new Date(string);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${addZero(day)}/${addZero(month)}/${year}`;
}

const parseDateWithHours = string => {
  const date = new Date(string);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return parseDate(string) + ` - ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}

export {
  parseDate,
  parseDateWithHours
}