import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'

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
}

export const ChangeInputCell: FC<ChangeInputCellProps> = memo(props => {
  const { rowId, onClickSubmit, text, disabled, isInteger, maxLength, isString, isPepurchase } = props

  const { classes: styles, cx } = useStyles()

  const [value, setValue] = useState(text ?? '')
  const [isShow, setIsShow] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    const isIntegerValid = isInteger ? /^[+]?\d*$/.test(inputValue) : /^[+]?\d*\.?\d{0,2}$/.test(inputValue)

    if (isIntegerValid) {
      setValue(inputValue)
    }

    if (isString) {
      setValue(inputValue)
    }
  }

  const handleSave = () => {
    setIsShow(true)

    setTimeout(() => {
      setIsShow(false)
    }, 2000)

    onClickSubmit(rowId, value)
  }

  const disabledSave =
    value !== '' && (!isPepurchase || (!isNaN(Number(value)) && (Number(value) === 0 || Number(value) >= 50)))
  const inputError = value === '' || !disabledSave

  return (
    <Input
      disabled={disabled}
      className={cx({ [styles.error]: inputError })}
      classes={{ input: styles.input }}
      inputProps={{ maxLength: maxLength || 7 }}
      value={value}
      endAdornment={
        <>
          {isShow ? <DoneIcon className={styles.doneIcon} /> : null}

          {text !== Number(value) && !isShow ? (
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
