import { FC, memo, useState } from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'

import { useStyles } from './copy-value.style'

interface CopyValueProps {
  text: string | undefined
  disabled?: boolean
  iconStyles?: string
}

export const CopyValue: FC<CopyValueProps> = memo(({ text, disabled, iconStyles }) => {
  const { classes: styles, cx } = useStyles()

  const [copied, setCopied] = useState(false)

  const handleCopyValue = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.copyImgWrapper}>
      {copied ? (
        <DoneIcon className={cx(styles.doneIcon, iconStyles)} />
      ) : (
        <ContentCopyIcon
          className={cx(styles.copyImg, iconStyles, { [styles.disabledIcon]: disabled })}
          onClick={e => {
            e.stopPropagation()
            !disabled && !!text && handleCopyValue(text)
          }}
        />
      )}
    </div>
  )
})
