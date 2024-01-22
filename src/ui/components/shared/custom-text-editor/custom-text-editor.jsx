import { EditorState, convertToRaw } from 'draft-js'
import { observer } from 'mobx-react'
import MUIRichTextEditor from 'mui-rte'
import { useEffect, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-text-editor.style'

import { controls, customControls } from './custom-text-editor.config'

export const CustomTextEditor = observer(props => {
  const { conditions, onChangeConditions, readOnly, editorClassName, verticalResize, maxLength, notStyles } = props

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

  const showErrorBorder = conditions.length > maxLength && !readOnly

  return (
    <div className={styles.wrapper}>
      {/* {!readOnly && !notStyles && <p className={styles.editorTitle}>{t(TranslationKey['Describe your task']) + '*'}</p>} */}

      <MUIRichTextEditor
        maxLength={maxLength}
        readOnly={readOnly}
        defaultValue={defaultValue}
        label={!readOnly && t(TranslationKey['Task description'])}
        controls={readOnly ? [] : controls}
        customControls={customControls}
        classes={{
          editor: cx(
            styles.editor,
            {
              [styles.verticalResize]: verticalResize,
              [styles.editorBorderError]: showErrorBorder,
              [styles.noneBorder]: notStyles,
            },
            editorClassName,
          ),
          container: cx({ [styles.container]: !readOnly }),
          editorContainer: cx(styles.editorContainer, {
            [styles.editorContainerReadOnly]: readOnly,
            [styles.editorContainerNotStyles]: notStyles,
          }),
          toolbar: styles.toolbar,
        }}
        onChange={onChange}
      />
    </div>
  )
})
