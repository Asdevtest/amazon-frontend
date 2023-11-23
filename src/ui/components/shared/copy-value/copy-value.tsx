import React, { FC, memo, useState } from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'

import { useStyles } from './copy-value.style'

interface CopyValueProps {
  text: string | undefined
  disabled?: boolean
}

export const CopyValue: FC<CopyValueProps> = memo(({ text, disabled }) => {
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
        <DoneIcon classes={{ root: styles.doneIcon }} />
      ) : (
        <ContentCopyIcon
          className={cx(styles.copyImg, { [styles.disabledIcon]: disabled })}
          onClick={e => {
            e.stopPropagation()
            !disabled && !!text && handleCopyValue(text)
          }}
        />
      )}
    </div>
  )
})
