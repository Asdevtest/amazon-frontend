import Bowser from 'bowser'

export const getBrowserAndVersion = (userAgent: string): string => {
  const browser = Bowser.getParser(userAgent).getBrowser()

  return `${browser?.name} (${browser?.version})`
}
