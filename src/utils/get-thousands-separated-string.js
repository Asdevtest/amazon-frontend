export const getThousandsSeparatedString = (number, separator) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
