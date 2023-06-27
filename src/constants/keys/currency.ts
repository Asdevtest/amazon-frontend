export const currencyTypes = {
  DOLLAR: 'DOLLAR',
  YUAN: 'YUAN',
}

export const currencyTypesToHumanFriendlyValue = (currency: string) => {
  switch (currency) {
    case currencyTypes.DOLLAR:
      return '$'
    case currencyTypes.YUAN:
      return '¥'
  }
}
