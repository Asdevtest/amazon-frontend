import { ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

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

  const { classes: styles } = useStyles()
  const [value, setValue] = useState(text || '')
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

  useEffect(() => {
    if (text) {
      setValue(text)
    }
  }, [text])

  const disabledSave = !isPepurchase || (!isNaN(Number(value)) && (Number(value) === 0 || Number(value) >= 50))

  return (
    <Input
      disabled={disabled}
      classes={{ input: styles.input }}
      inputProps={{ maxLength: maxLength || 7 }}
      value={String(value)}
      endAdornment={
        <>
          {isShow ? <MdDone size={16} className={styles.doneIcon} /> : null}

          {Number(text) !== Number(value) ? (
            <div className={styles.icons}>
              <button disabled={!disabledSave} className={styles.button} onClick={handleSave}>
                <SaveIcon className={styles.saveIcon} />
              </button>
              <button className={styles.button} onClick={() => setValue(text)}>
                <MdClear size={16} className={styles.clearIcon} />
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
