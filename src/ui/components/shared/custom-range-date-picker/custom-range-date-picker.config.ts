import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

export const rangePresets: RangePickerProps['presets'] = [
  { label: 'Yesterday', value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
  { label: 'Today', value: [dayjs(), dayjs()] },
  { label: 'Tomorrow', value: [dayjs().add(1, 'day'), dayjs().add(1, 'day')] },
  { label: 'This week', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: 'This month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
]
