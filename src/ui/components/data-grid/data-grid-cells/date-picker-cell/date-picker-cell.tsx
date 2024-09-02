import { FC, memo, useEffect, useState } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { DatePicker } from '@components/shared/date-picker'
import { SaveIcon } from '@components/shared/svg-icons'

import { useStyles } from './date-picker-cell.style'

interface DatePickerCellProps {
  id: string
  arrivalDate: string
  onClickSaveArrivalDate: (id: string, value: string) => void
  disabled?: boolean
}

export const DatePickerCell: FC<DatePickerCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { id, arrivalDate, onClickSaveArrivalDate, disabled } = props

  const [value, setValue] = useState(arrivalDate || '')

  useEffect(() => {
    setValue(arrivalDate)
  }, [arrivalDate])

  const [isShow, setShow] = useState(false)

  return (
    <div className={styles.arrivalDateWrapper}>
      <DatePicker disabled={disabled} value={value} onChange={(e: string) => setValue(e)} />
      {!!onClickSaveArrivalDate && (
        <div>
          {isShow && arrivalDate !== value ? (
            <MdDone size={20} className={cx(styles.doneIcon, styles.arrivalDateIcon)} />
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
              <MdClear
                size={20}
                className={cx(styles.clearIcon, styles.arrivalDateIcon)}
                onClick={() => setValue(arrivalDate)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
})
