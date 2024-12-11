export const filterProducts = (inputValue: string, path: string) =>
  path?.toLowerCase().includes(inputValue.toLowerCase())
