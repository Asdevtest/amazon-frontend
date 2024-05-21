/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs'
import { FC, InputHTMLAttributes, ReactNode, Ref, RefAttributes, forwardRef, memo, useEffect, useState } from 'react'

import { useSlotProps } from '@mui/base/utils'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { unstable_useForkRef as useForkRef } from '@mui/utils'
import { DateRangePicker, DateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker'
import {
  SingleInputDateRangeFieldProps,
  UseSingleInputDateRangeFieldProps,
  unstable_useSingleInputDateRangeField as useSingleInputDateRangeField,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import { DateRange, DateRangeValidationError, FieldType, RangeFieldSection } from '@mui/x-date-pickers-pro/models'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useClearableField } from '@mui/x-date-pickers/hooks'
import { DateRangeIcon } from '@mui/x-date-pickers/icons'
import { BaseSingleInputFieldProps } from '@mui/x-date-pickers/models'

import { SettingsModel } from '@models/settings-model'

import { CustomHeader } from './custom-header'
import { shortcutsItems } from './date-range-picker.config'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  inputRef?: Ref<HTMLInputElement>
  InputProps?: {
    ref?: Ref<any>
    endAdornment?: ReactNode
    startAdornment?: ReactNode
  }
  error?: boolean
  focused?: boolean
  ownerState?: any
  enableAccessibleFieldDOMStructure: boolean
}

const Field = forwardRef((props: FieldProps, ref: Ref<HTMLDivElement>) => {
  const {
    disabled,
    id,
    inputRef,
    InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
    style,
    ...other
  } = props

  const handleRef = useForkRef(containerRef, ref)

  return (
    <div ref={handleRef} id={id} style={{ display: 'flex', alignItems: 'center', ...(style || {}) }}>
      {startAdornment}
      <input ref={inputRef} disabled={disabled} style={{ width: '100%' }} {...other} />
      {endAdornment}
    </div>
  )
})

interface CustomDateRangeFieldProps
  extends UseSingleInputDateRangeFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<DateRange<Dayjs>, Dayjs, RangeFieldSection, false, DateRangeValidationError> {
  onAdornmentClick?: () => void
}

type CustomDateRangeFieldComponent = ((
  props: CustomDateRangeFieldProps & RefAttributes<HTMLDivElement>,
) => JSX.Element) & { fieldType?: FieldType }

const CustomDateRangeField = forwardRef((props: CustomDateRangeFieldProps, ref: Ref<HTMLDivElement>) => {
  const { slots, slotProps, onAdornmentClick, ...other } = props

  const textFieldProps: SingleInputDateRangeFieldProps<Dayjs, false> = useSlotProps({
    elementType: 'input',
    externalSlotProps: slotProps?.textField,
    externalForwardedProps: other,
    ownerState: props as any,
  })

  textFieldProps.InputProps = {
    ...textFieldProps.InputProps,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={onAdornmentClick}>
          <DateRangeIcon />
        </IconButton>
      </InputAdornment>
    ),
  }

  const fieldResponse = useSingleInputDateRangeField<Dayjs, false, typeof textFieldProps>({
    ...textFieldProps,
    enableAccessibleFieldDOMStructure: false,
  })

  /* If you don't need a clear button, you can skip the use of this hook */
  const processedFieldProps = useClearableField({
    ...fieldResponse,
    slots,
    slotProps,
  })

  return (
    <Field
      ref={ref}
      style={{
        minWidth: 280,
      }}
      {...processedFieldProps}
    />
  )
}) as CustomDateRangeFieldComponent

CustomDateRangeField.fieldType = 'single-input'

export const CustomDateRangePicker: FC<DateRangePickerProps<Dayjs> & RefAttributes<HTMLDivElement>> = memo(
  forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<DateRange<Dayjs>>([null, null])

    useEffect(() => {
      if (value[0] && !value[1]) {
        setValue([value[0], value[0]])
      }

      if (!value[0] && value[1]) {
        setValue([value[1], value[1]])
      }
    }, [value])

    useEffect(() => {
      const grids = document.querySelectorAll('.MuiDateRangeCalendar-root')

      Array.from(grids).forEach(grid => {
        const childNodesList = grid?.childNodes
        const alertElement = childNodesList?.[0] as HTMLElement

        if (alertElement) {
          alertElement.style.display = 'none'
        }
      })
    }, [])

    const toggleOpen = () => setIsOpen(currentOpen => !currentOpen)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={SettingsModel.languageTag}>
        <DateRangePicker
          ref={ref}
          showDaysOutsideCurrentMonth
          open={isOpen}
          fixedWeekNumber={6}
          calendars={1}
          value={value}
          slots={{ ...props.slots, field: CustomDateRangeField, calendarHeader: CustomHeader }}
          slotProps={{
            ...props.slotProps,
            field: {
              clearable: true,
              onAdornmentClick: toggleOpen,
              ...props.slotProps?.field,
            } as any,
            actionBar: {
              actions: ['cancel', 'accept'],
            },
            shortcuts: {
              items: shortcutsItems,
            } as any,
          }}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={newValue => setValue(newValue)}
          {...props}
        />
      </LocalizationProvider>
    )
  }),
)
