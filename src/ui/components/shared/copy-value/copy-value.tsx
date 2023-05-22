import { cx } from '@emotion/css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'

import React, { FC, useState } from 'react'

import { useClassNames } from './copy-value.style'

interface CopyValueProps {
  text: string
  disabled?: boolean
}

export const CopyValue: FC<CopyValueProps> = props => {
  const { classes: classNames } = useClassNames()

  const { text, disabled } = props

  const [copied, setCopied] = useState(false)

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <>
      <div className={classNames.copyImgWrapper}>
        {copied ? (
          <DoneIcon classes={{ root: classNames.doneIcon }} />
        ) : (
          <ContentCopyIcon
            className={cx(classNames.copyImg, { [classNames.disabledIcon]: disabled })}
            onClick={e => {
              e.stopPropagation()
              !disabled && copyValue(text)
            }}
          />
        )}
      </div>
    </>
  )
}
