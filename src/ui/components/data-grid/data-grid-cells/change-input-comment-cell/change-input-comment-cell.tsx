import React, { FC, useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { Input, InputAdornment } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SaveIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './change-input-comment-cell.style'

interface ChangeInputCommentCellProps {
  onClickSubmit: () => void
  onChangeText?: (fieldName: string) => (value: string) => void
  text: string
  disabled?: boolean
  maxLength?: number
  fieldName?: string
  placeholder?: string
  disableMultiline?: boolean
}

export const ChangeInputCommentCell: FC<ChangeInputCommentCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { onClickSubmit, onChangeText, text, disabled, maxLength, fieldName, placeholder, disableMultiline } = props

  const [value, setValue] = useState('')
  const [isEdited, setIsEdited] = useState(false)
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    setValue(text)
  }, [text])

  return (
    <div className={styles.changeInputCommentCellWrapper}>
      <Input
        multiline={!disableMultiline}
        autoFocus={false}
        inputProps={{ maxLength: maxLength ? maxLength : 256 }}
        placeholder={placeholder ?? t(TranslationKey.Comment)}
        disabled={disabled}
        className={styles.changeInputCommentRoot}
        classes={{ input: styles.changeInputComment }}
        value={value}
        endAdornment={
          !!onClickSubmit && (
            <InputAdornment position="start" className={styles.commentControls}>
              {isShow ? (
                <DoneIcon classes={{ root: styles.doneIcon }} />
              ) : isEdited && text !== value ? (
                <div className={styles.iconWrapper}>
                  <SaveIcon
                    className={styles.changeInputIcon}
                    onClick={() => {
                      setShow(true)
                      setTimeout(() => {
                        setShow(false)
                        setIsEdited(false)
                      }, 2000)
                      onClickSubmit()
                    }}
                  />
                  <ClearIcon
                    classes={{ root: styles.clearIcon }}
                    onClick={() => {
                      setIsEdited(false)
                      setValue(text)
                    }}
                  />
                </div>
              ) : null}
            </InputAdornment>
          )
        }
        onChange={e => {
          setValue(e.target.value)
          setIsEdited(true)
          if (onChangeText) {
            onChangeText(fieldName || 'comments')(e.target.value)
          }
        }}
        onKeyDown={event => {
          event.stopPropagation()
        }}
      />
    </div>
  )
})
