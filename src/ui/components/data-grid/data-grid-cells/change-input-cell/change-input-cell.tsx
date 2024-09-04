import { ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'

import { Input } from '@components/shared/input'
import { SaveIcon } from '@components/shared/svg-icons'

import { useStyles } from './change-input-cell.style'

interface ChangeInputCellProps {
  rowId: string
  text: string | number
  onClickSubmit: (rowId: string, value: string | number) => void
  disabled?: boolean
  isInteger?: boolean
  maxLength?: number
  isString?: boolean
  isPepurchase?: boolean
  minValue?: number
  maxValue?: number
}

export const ChangeInputCell: FC<ChangeInputCellProps> = memo(props => {
  const { rowId, onClickSubmit, text, disabled, isInteger, maxLength, isString, isPepurchase, minValue, maxValue } =
    props

  const { classes: styles } = useStyles()
  const [value, setValue] = useState(text || '')
  const [isShow, setIsShow] = useState(false)
  const [isInvalidValue, setIsInvalidValue] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const isIntegerValid = isInteger ? /^[+]?\d*$/.test(inputValue) : /^[+]?\d*\.?\d{0,2}$/.test(inputValue)

    if (isIntegerValid) {
      setValue(inputValue)
    }

    if (isString) {
      setValue(inputValue)
    }

    if (isPepurchase && isInteger) {
      const numericValue = Number(inputValue)
      if (numericValue === 0) {
        // Allow 0 value
        setIsInvalidValue(false)
      } else if ((minValue && numericValue < minValue) || (maxValue && numericValue > maxValue)) {
        setIsInvalidValue(true)
      } else {
        setIsInvalidValue(false)
      }
    }
  }

  const handleSave = () => {
    setIsShow(true)
    setTimeout(() => {
      setIsShow(false)
    }, 2000)

    onClickSubmit(rowId, value)
  }

  useEffect(() => {
    if (text) {
      setValue(text)
    }
  }, [text])

  const disabledSave =
    !isPepurchase || (!isNaN(Number(value)) && (Number(value) === 0 || Number(value) >= 50) && !isInvalidValue)

  return (
    <Input
      disabled={disabled}
      classes={{ input: styles.input }}
      inputProps={{ maxLength: maxLength || 7 }}
      value={String(value)}
      endAdornment={
        <>
          {isShow ? <DoneIcon className={styles.doneIcon} /> : null}

          {Number(text) !== Number(value) ? (
            <div className={styles.icons}>
              <button disabled={!disabledSave} className={styles.button} onClick={handleSave}>
                <SaveIcon className={styles.saveIcon} />
              </button>
              <button className={styles.button} onClick={() => setValue(text)}>
                <ClearIcon className={styles.clearIcon} />
              </button>
            </div>
          ) : null}
        </>
      }
      onChange={handleChange}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => e.stopPropagation()}
    />
  )
})
