/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, KeyboardEvent, useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { Input, InputAdornment } from '@mui/material'

import { SaveIcon } from '@components/shared/svg-icons'

import { checkIsMoreNCharactersAfterDot, checkIsNumberWithDot, checkIsPositiveNum } from '@utils/checks'

import { useDataGridCellStyles } from './change-input-cell.style'

interface ChangeInputCellProps {
  rowId: string
  text?: string
  disabled?: boolean
  isInts?: boolean
  maxLength?: number
  checkValue: (value: string | undefined | boolean | number) => boolean
  onClickSubmit: (rowId: string, value: string | undefined) => void
}

export const ChangeInputCell: FC<ChangeInputCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
  const { rowId, onClickSubmit, text, disabled, isInts, maxLength, checkValue } = props

  const sourceValue = text !== null ? text : ''

  const [value, setValue] = useState(sourceValue)

  useEffect(() => {
    setValue(sourceValue)
  }, [text])

  const [isMyInputFocused, setIsMyInputFocused] = useState(false)

  const [isShow, setShow] = useState(false)

  const valueChecked = checkValue ? checkValue(value) : true

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (valueChecked && isMyInputFocused && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 2000)
        onClickSubmit(rowId, value)
      }
    }
    // @ts-ignore
    document.addEventListener('keydown', listener)
    return () => {
      // @ts-ignore
      document.removeEventListener('keydown', listener)
    }
  }, [value])

  return (
    <div>
      <Input
        disabled={disabled}
        className={cx(styles.changeInput, { [styles.errorInputActive]: !valueChecked && value !== '' })}
        classes={{ input: styles.changeInput }}
        inputProps={{ maxLength: maxLength ? maxLength : 7 }}
        value={value}
        endAdornment={
          <InputAdornment position="start">
            {isShow && sourceValue !== value ? (
              <DoneIcon classes={{ root: styles.doneIcon }} />
            ) : sourceValue !== value && valueChecked ? (
              <div className={styles.iconWrapper}>
                <SaveIcon
                  className={styles.changeInputIcon}
                  onClick={() => {
                    setShow(true)
                    setTimeout(() => {
                      setShow(false)
                    }, 2000)
                    onClickSubmit(rowId, value)
                  }}
                />
                <ClearIcon classes={{ root: styles.clearIcon }} onClick={() => setValue(sourceValue)} />
              </div>
            ) : null}
          </InputAdornment>
        }
        onChange={e => {
          if (isInts) {
            if (
              checkIsPositiveNum(e.target.value) &&
              checkIsNumberWithDot(e.target.value) &&
              !checkIsMoreNCharactersAfterDot(e.target.value, 2)
            ) {
              setValue(e.target.value)
            }
          } else {
            setValue(e.target.value)
          }
        }}
        onKeyDown={e => {
          e.stopPropagation()
        }}
        onBlur={() => setIsMyInputFocused(false)}
        onFocus={() => setIsMyInputFocused(true)}
      />
    </div>
  )
})
