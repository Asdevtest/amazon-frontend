import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

export const rangePresets: RangePickerProps['presets'] = [
  { label: 'Today', value: [dayjs(), dayjs()] },
  { label: 'Tommorow', value: [dayjs().add(1, 'day'), dayjs().add(1, 'day')] },
  { label: 'This week', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: 'This month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
]
