import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { FC, memo, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { useStyles } from './custom-text-editor.style'

import { toolbar } from './custom-text-editor.config'

interface CustomTextEditorProps {
  value: string
  readOnly?: boolean
  maxLength?: number
  title?: string
  placeholder?: string
  disableToolbar?: boolean
  wrapperClassName?: string
  editorWrapperClassName?: string
  editorToolbarClassName?: string
  editorClassName?: string
  onChange?: (value: string) => void
}

export const CustomTextEditor: FC<CustomTextEditorProps> = memo(props => {
  const {
    value,
    readOnly,
    maxLength,
    title,
    placeholder,
    disableToolbar,
    wrapperClassName,
    editorWrapperClassName,
    editorToolbarClassName,
    editorClassName,
    onChange,
  } = props

  const { classes: styles, cx } = useStyles()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isUpdated, setIsUpdated] = useState(false)
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (isUpdated) {
      return
    }

    try {
      // ContentState.createFromText(value) - this is a just text, so value.startsWith('{"blocks":') - that other requests do not break (leave only convertFromRaw(JSON.parse(value)) - right solution)
      const contentState = value.startsWith('{"blocks":')
        ? convertFromRaw(JSON.parse(value))
        : ContentState.createFromText(value)
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }, [value, isUpdated])

  const handleEditorStateChange = (state: EditorState) => {
    setIsUpdated(true)
    setEditorState(state)

    if (onChange) {
      onChange(JSON.stringify(convertToRaw(state.getCurrentContent())))
    }
  }

  const showErrorBorder =
    !!maxLength && JSON.stringify(convertToRaw(editorState.getCurrentContent())).length > maxLength

  const CustomOptionTitle = () => {
    return <p className={styles.title}>{title}</p>
  }

  return (
    <div className={cx(styles.wrapper, wrapperClassName)}>
      <Editor
        spellCheck
        // toolbarOnFocus
        placeholder={placeholder}
        readOnly={readOnly}
        editorState={editorState}
        wrapperClassName={cx(styles.editorContainer, editorWrapperClassName)}
        toolbarClassName={cx(styles.toolbar, editorToolbarClassName)}
        editorClassName={cx(
          styles.editor,
          {
            [styles.readOnly]: readOnly,
            [styles.focus]: focus,
            [styles.editorBorderError]: showErrorBorder,
          },
          editorClassName,
        )}
        toolbarCustomButtons={[<CustomOptionTitle key="custom-title" />]}
        toolbar={toolbar(readOnly || disableToolbar)}
        onEditorStateChange={handleEditorStateChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onTab={() => setFocus(true)}
      />
    </div>
  )
})
