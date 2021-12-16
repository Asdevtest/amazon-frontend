export const getShortenStringIfLongerThanCount = (str, count) =>
  str.length > count ? `${str.slice(0, count)}...` : str
