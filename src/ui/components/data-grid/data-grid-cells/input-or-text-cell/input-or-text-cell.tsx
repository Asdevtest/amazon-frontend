import { FC, memo, useEffect, useState } from 'react'

import { useStyles } from './input-or-text-cell.style'

interface InputOrTextCellProps {
  isEdit: boolean
  text: string
  onChange: (specTitle: string) => void
  onCancel: () => void
}

export const InputOrTextCell: FC<InputOrTextCellProps> = memo(props => {
  const { isEdit, text, onChange, onCancel } = props

  const { classes: styles, cx } = useStyles()

  const [inputValue, setInputValue] = useState(text || '')

  useEffect(() => {
    onChange(inputValue)
  }, [inputValue])

  const handleCancel = () => {
    setInputValue(text)
    onCancel()
  }

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperDisabled]: !isEdit })}>
      <input
        type="text"
        disabled={!isEdit}
        value={inputValue}
        className={styles.input}
        onChange={e => setInputValue(e.target.value)}
      />

      {isEdit ? (
        <button className={styles.button} onClick={handleCancel}>
          ✕
        </button>
      ) : null}
    </div>
  )
})
