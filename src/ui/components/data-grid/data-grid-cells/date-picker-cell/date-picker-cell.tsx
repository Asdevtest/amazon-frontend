import React, { FC, useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'

import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { SaveIcon } from '@components/shared/svg-icons'

import { useDataGridCellStyles } from './date-picker-cell.style'

interface DatePickerCellProps {
  id: string
  arrivalDate: string
  onClickSaveArrivalDate: (id: string, value: string) => void
  disabled?: boolean
}

export const DatePickerCell: FC<DatePickerCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
  const { id, arrivalDate, onClickSaveArrivalDate, disabled } = props

  const [value, setValue] = useState(arrivalDate || '')

  useEffect(() => {
    setValue(arrivalDate)
  }, [arrivalDate])

  const [isShow, setShow] = useState(false)

  return (
    <div className={styles.arrivalDateWrapper}>
      <NewDatePicker
        disabled={disabled}
        value={value}
        onChange={(e: string) => {
          setValue(e)
        }}
      />
      {!!onClickSaveArrivalDate && (
        <div>
          {isShow && arrivalDate !== value ? (
            <DoneIcon classes={{ root: cx(styles.doneIcon, styles.arrivalDateIcon) }} />
          ) : arrivalDate !== value ? (
            <div className={cx(styles.iconWrapper, styles.iconWrapperArrivalDate)}>
              <SaveIcon
                className={cx(styles.changeInputIcon, styles.arrivalDateIcon)}
                onClick={() => {
                  setShow(true)
                  setTimeout(() => {
                    setShow(false)
                  }, 2000)
                  onClickSaveArrivalDate(id, value)
                }}
              />
              <ClearIcon
                classes={{ root: cx(styles.clearIcon, styles.arrivalDateIcon) }}
                onClick={() => setValue(arrivalDate)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
})
