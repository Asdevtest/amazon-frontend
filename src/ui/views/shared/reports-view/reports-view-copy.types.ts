import { RangePickerProps } from 'antd/es/date-picker'

export interface ReportsViewProps {
  productId: string
  modal?: boolean
  subView?: boolean
}

export type RangeDateType = RangePickerProps['value']
