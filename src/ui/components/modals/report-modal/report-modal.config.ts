import { Launches } from '@typings/enums/launches'

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase()),
}))
