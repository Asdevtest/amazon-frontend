import {cx} from '@emotion/css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'

import React, {useState} from 'react'

import {useClassNames} from './copy-value.style'

export const CopyValue = ({text, disabled}) => {
  const {classes: classNames} = useClassNames()
  const [copied, setCopied] = useState(false)

  const copyValue = value => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <>
      <div className={classNames.copyImgWrapper}>
        {copied ? (
          <DoneIcon classes={{root: classNames.doneIcon}} />
        ) : (
          <ContentCopyIcon
            className={cx(classNames.copyImg, {[classNames.disabledIcon]: disabled})}
            onClick={e => {
              e.stopPropagation()
              !disabled && copyValue(text)
            }}
          />
          // <img
          //   className={cx(classNames.copyImg, {[classNames.disabledIcon]: disabled})}
          //   src="/assets/icons/copy-img.svg"
          //   alt=""
          //   onClick={e => {
          //     e.stopPropagation()
          //     !disabled && copyValue(text)
          //   }}
          // />
        )}
      </div>
    </>
  )
}
