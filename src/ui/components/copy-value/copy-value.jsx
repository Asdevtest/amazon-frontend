import DoneIcon from '@mui/icons-material/Done'

import React, {useState} from 'react'

import {useClassNames} from './copy-value.style'

export const CopyValue = ({text}) => {
  const classNames = useClassNames()
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
          <DoneIcon color="success" classes={{root: classNames.doneIcon}} />
        ) : (
          <img
            className={classNames.copyImg}
            src="/assets/icons/copy-img.svg"
            alt=""
            onClick={e => {
              e.stopPropagation()
              copyValue(text)
            }}
          />
        )}
      </div>
    </>
  )
}
