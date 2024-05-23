import dayjs from 'dayjs'

export const shortcutsItems = [
  {
    label: 'Today',
    getValue: () => {
      const today = dayjs()
      return [today, today]
    },
  },
  {
    label: 'Tommorow',
    getValue: () => {
      const today = dayjs()
      return [today.add(1, 'day'), today.add(1, 'day')]
    },
  },
  {
    label: 'This week',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('week'), today.endOf('week')]
    },
  },
  {
    label: 'This month',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('month'), today.endOf('month')]
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
]
