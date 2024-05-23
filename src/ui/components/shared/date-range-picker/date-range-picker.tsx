import { Dayjs } from 'dayjs'
import { FC, RefAttributes, forwardRef, memo, useEffect, useState } from 'react'

import { DateRangePicker, DateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { SettingsModel } from '@models/settings-model'

import { useStyles } from './date-range-picker.style'

import { CustomDateRangeField } from './custom-field'
import { CustomHeader } from './custom-header'
import { shortcutsItems } from './date-range-picker.config'

interface CustomDateRangePickerProps extends DateRangePickerProps<Dayjs> {
  wrapperClassName?: string
  inputClassName?: string
}

export const CustomDateRangePicker: FC<CustomDateRangePickerProps & RefAttributes<HTMLDivElement>> = memo(
  forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
    const { classes: styles } = useStyles()

    useEffect(() => {
      if (!isOpen) {
        if (value[0] && !value[1]) {
          setValue([value[0], value[0]])
        }

        if (!value[0] && value[1]) {
          setValue([value[1], value[1]])
        }
      }
    }, [value, isOpen])

    useEffect(() => {
      const grids = document.querySelectorAll('.MuiDateRangeCalendar-root')

      Array.from(grids).forEach(grid => {
        const childNodesList = grid?.childNodes
        const alertElement = childNodesList?.[0] as HTMLElement

        if (alertElement) {
          alertElement.style.display = 'none'
        }
      })
    }, [value])

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
          sx={{ padding: 100 }}
          slots={{ ...props.slots, field: CustomDateRangeField, calendarHeader: CustomHeader }}
          slotProps={{
            ...props.slotProps,
            field: {
              clearable: true,
              onAdornmentClick: toggleOpen,
              wrapperClassName: props.wrapperClassName,
              inputClassName: props.inputClassName,
              ...props.slotProps?.field,
            } as any,
            actionBar: {
              actions: ['clear', 'cancel', 'accept'],
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
