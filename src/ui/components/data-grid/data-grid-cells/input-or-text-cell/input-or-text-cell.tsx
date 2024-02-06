import { FC, memo, useEffect, useState } from 'react'

import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'

import { useStyles } from './input-or-text-cell.style'

interface InputOrTextCellProps {
  text: string
  onChange: (specTitle: string) => void
  isEdit?: boolean
  tooltipTextLength?: number
  maxInputValueLength?: number
}

export const InputOrTextCell: FC<InputOrTextCellProps> = memo(props => {
  const { text, onChange, isEdit, tooltipTextLength, maxInputValueLength } = props

  const { classes: styles, cx } = useStyles()

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (text.length > 0) {
      setInputValue(text.trim())
    }
  }, [text, isEdit]) // isEdit - return text value when canceling change

  useEffect(() => {
    if (isEdit) {
      onChange(inputValue.trim())
    }
  }, [inputValue])

  const showError = isEdit && inputValue.length === 0
  const showButton = isEdit && inputValue.length !== 0
  const showTooltipInputText = tooltipTextLength && inputValue.length > tooltipTextLength

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperDisabled]: !isEdit, [styles.wrapperError]: showError })}>
      <input
        type="text"
        title={showTooltipInputText ? inputValue : ''}
        disabled={!isEdit}
        value={inputValue}
        maxLength={maxInputValueLength || MAX_DEFAULT_INPUT_VALUE}
        className={cx(styles.input, { [styles.inputError]: showError })}
        onChange={e => setInputValue(e.target.value)}
      />

      {showButton ? (
        <button className={styles.button} onClick={() => setInputValue('')}>
          ✕
        </button>
      ) : null}
    </div>
  )
})
