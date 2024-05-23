/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs'
import { FC, RefAttributes, forwardRef, memo, useState } from 'react'

import { DateRangePicker, DateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { SettingsModel } from '@models/settings-model'

import { useStyles } from './date-range-picker.style'

import { CrossIcon } from '../svg-icons'

import { CustomDateRangeField } from './custom-field'
import { CustomHeader } from './custom-header'
import { shortcutsItems } from './date-range-picker.config'

interface CustomDateRangePickerProps extends DateRangePickerProps<Dayjs> {
  wrapperClassName?: string
  inputClassName?: string
  onAdditionalClick?: (value: DateRange<Dayjs>) => void
}

export const CustomDateRangePicker: FC<CustomDateRangePickerProps & RefAttributes<HTMLDivElement>> = memo(
  forwardRef((props, ref) => {
    const { slots, slotProps, wrapperClassName, inputClassName, onAdditionalClick } = props

    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
    const { classes: styles } = useStyles()

    /* useEffect(() => {
      const grids = document.querySelectorAll('.MuiDateRangeCalendar-root')

      Array.from(grids).forEach(grid => {
        const childNodesList = grid?.childNodes
        const alertElement = childNodesList?.[0] as HTMLElement

        if (alertElement) {
          alertElement.style.display = 'none'
        }
      })
    }, [value]) */

    const toggleOpen = () => setIsOpen(currentOpen => !currentOpen)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => {
      setIsOpen(false)
      onAdditionalClick?.(value)
    }
    const handleReset = () => {
      setValue([null, null])
      onAdditionalClick?.([null, null])
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={SettingsModel.languageTag}>
        <DateRangePicker
          ref={ref}
          showDaysOutsideCurrentMonth
          open={isOpen}
          fixedWeekNumber={6}
          calendars={1}
          value={value}
          slots={{
            ...slots,
            field: CustomDateRangeField,
            calendarHeader: CustomHeader,
            clearButton: () => (
              <button onClick={handleReset}>
                <CrossIcon className={styles.clearIcon} />
              </button>
            ),
          }}
          slotProps={{
            ...slotProps,
            field: {
              clearable: true,
              onAdornmentClick: toggleOpen,
              wrapperClassName,
              inputClassName,
              ...slotProps?.field,
            } as any,
            actionBar: {
              actions: ['cancel', 'accept'],
            },
            shortcuts: {
              items: shortcutsItems,
              subheader: <p className={styles.subheader}></p>,
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
