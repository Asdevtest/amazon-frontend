import { EditorState, convertToRaw } from 'draft-js'
import { observer } from 'mobx-react'
import MUIRichTextEditor from 'mui-rte'
import { useEffect, useMemo, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-text-editor.style'

import { controls, customControls } from './custom-text-editor.config'

export const CustomTextEditor = observer(props => {
  const { conditions, onChangeConditions, readOnly, editorClassName, verticalResize, maxlength = 2000 } = props

  const isJSON = text => {
    try {
      const res = JSON.parse(text)

      if (typeof res === 'number') {
        throw new Error()
      }

      return text
    } catch (error) {
      const editorState = EditorState.createWithText(text)
      const serializedEditorState = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

      return serializedEditorState
    }
  }

  const { classes: styles, cx } = useStyles()

  const defaultValue = useMemo(() => isJSON(conditions), [])

  const [text, setText] = useState('')

  const onChange = state => {
    setText(JSON.stringify(convertToRaw(state.getCurrentContent())))

    if (!state.getCurrentContent().hasText()) {
      setText('')
    }
  }

  useEffect(() => {
    if (onChangeConditions) {
      onChangeConditions(text)
    }
  }, [text])

  return (
    <div className={styles.richTextEditorWrapper}>
      {!readOnly && (
        <Typography className={styles.richTextEditorTitle}>{t(TranslationKey['Describe your task']) + '*'}</Typography>
      )}

      <div className={styles.richTextEditorSubWrapper}>
        <MUIRichTextEditor
          maxLength={maxlength}
          readOnly={readOnly}
          defaultValue={defaultValue}
          label={!readOnly && t(TranslationKey['Task description'])}
          controls={readOnly ? [] : controls}
          customControls={customControls}
          classes={{
            root: styles.root,
            container: styles.container,
            editor: cx(styles.editor, editorClassName, {
              [styles.verticalResize]: verticalResize,
              [styles.editorBorder]: !readOnly,
              [styles.editorBorderError]: conditions.length > maxlength && !readOnly,
            }),
            editorContainer: cx(styles.editorContainer, { [styles.editorContainerReadOnly]: readOnly }),
            placeHolder: styles.placeHolder,
            toolbar: styles.toolbar,
          }}
          onChange={onChange}
        />
      </div>
    </div>
  )
})
