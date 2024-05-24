/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs'
import { InputHTMLAttributes, ReactNode, Ref, RefAttributes } from 'react'

import { UseSingleInputDateRangeFieldProps } from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import { DateRange, DateRangeValidationError, FieldType, RangeFieldSection } from '@mui/x-date-pickers-pro/models'
import { BaseSingleInputFieldProps } from '@mui/x-date-pickers/models'

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  enableAccessibleFieldDOMStructure: boolean
  label?: ReactNode
  inputRef?: Ref<HTMLInputElement>
  InputProps?: {
    ref?: Ref<any>
    endAdornment?: ReactNode
    startAdornment?: ReactNode
  }
  error?: boolean
  focused?: boolean
  ownerState?: CustomDateRangeFieldProps
  sx?: any
  wrapperClassName?: string
  inputClassName?: string
}

export interface CustomDateRangeFieldProps
  extends UseSingleInputDateRangeFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<DateRange<Dayjs>, Dayjs, RangeFieldSection, false, DateRangeValidationError> {
  onAdornmentClick?: () => void
}

export type CustomDateRangeFieldComponent = ((
  props: CustomDateRangeFieldProps & RefAttributes<HTMLDivElement>,
) => JSX.Element) & { fieldType?: FieldType }
