import { FC, memo, useEffect, useState } from 'react'

import { useStyles } from './input-or-text-cell.style'

interface InputOrTextCellProps {
  text: string
  onChange: (specTitle: string) => void
  isEdit?: boolean
}

export const InputOrTextCell: FC<InputOrTextCellProps> = memo(props => {
  const { isEdit, text, onChange } = props

  const { classes: styles, cx } = useStyles()

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (text.length > 0) {
      setInputValue(text)
    }
  }, [text, isEdit]) // isEdit - return text value when canceling change

  useEffect(() => {
    if (isEdit) {
      onChange(inputValue)
    }
  }, [inputValue])

  const showError = isEdit && inputValue.length === 0
  const showButton = isEdit && inputValue.length !== 0

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperDisabled]: !isEdit, [styles.wrapperError]: showError })}>
      <input
        type="text"
        disabled={!isEdit}
        value={inputValue}
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
