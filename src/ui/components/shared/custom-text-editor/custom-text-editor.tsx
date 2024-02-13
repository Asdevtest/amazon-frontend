import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import MUIRichTextEditor from 'mui-rte'
import { FC, memo, useState } from 'react'

import { useStyles } from './custom-text-editor.style'

import { getControls, getCustomControls } from './custom-text-editor.config'

interface CustomTextEditorProps {
  value: string
  readOnly?: boolean
  maxLength?: number
  title?: string
  verticalResize?: boolean
  placeholder?: string
  disableToolbar?: boolean
  editorWrapperClassName?: string
  editorContainerClassName?: string
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
    verticalResize,
    editorWrapperClassName,
    editorContainerClassName,
    editorToolbarClassName,
    editorClassName,
    onChange,
  } = props

  const { classes: styles, cx } = useStyles()

  // ContentState.createFromText(value) - this is a just text, so value.startsWith('{"blocks":') - that other requests do not break (leave only convertFromRaw(JSON.parse(value)) - right solution)
  const contentState = value?.startsWith('{"blocks":')
    ? convertFromRaw(JSON?.parse(value))
    : ContentState?.createFromText(value)
  const editorState = EditorState.createWithContent(contentState)
  const rawContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  const [defaultValue] = useState(rawContentState)
  const [focus, setFocus] = useState(false)

  const showErrorBorder = !!maxLength && value.length > maxLength

  return (
    <MUIRichTextEditor
      // maxLength={maxLength} // works the same as in input, but the value is markup
      defaultValue={defaultValue}
      label={readOnly ? '' : placeholder}
      readOnly={readOnly}
      toolbar={!disableToolbar}
      toolbarButtonSize="small"
      draftEditorProps={{
        spellCheck: true,
        stripPastedStyles: true,
      }}
      controls={getControls(readOnly)}
      customControls={getCustomControls(title)}
      classes={{
        root: cx(styles.wrapper, editorWrapperClassName),
        container: styles.container,
        editorContainer: cx(styles.editorContainer, editorContainerClassName, {
          [styles.editorContainerReadOnly]: readOnly,
        }),
        editor: cx(styles.editor, editorClassName, {
          [styles.editorBorder]: !readOnly,
          [styles.editorBorderFocus]: focus,
          [styles.editorBorderError]: showErrorBorder,
          [styles.verticalResize]: verticalResize,
        }),
        toolbar: cx(styles.editorToolbar, editorToolbarClassName),
        placeHolder: styles.placeHolder,
      }}
      onChange={(state: EditorState) =>
        onChange ? onChange(JSON.stringify(convertToRaw(state.getCurrentContent()))) : undefined
      }
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  )
})
