import { EditorState, convertToRaw } from 'draft-js'
import MUIRichTextEditor from 'mui-rte'
import { FC, memo, useMemo, useState } from 'react'

import { useStyles } from './custom-text-editor.style'

import { getControls, getCustomControls } from './custom-text-editor.config'
import { parseJSON } from './helpers/parse-json'

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

  const [focus, setFocus] = useState(false)
  const defaultValue = useMemo(() => {
    if (!value) {
      return ''
    }

    return parseJSON(value)
  }, [])
  const showErrorBorder = !!maxLength && value.length > maxLength
  const handleChange = (state: EditorState) =>
    onChange ? onChange(JSON.stringify(convertToRaw(state.getCurrentContent()))) : undefined

  return (
    <MUIRichTextEditor
      // maxLength={maxLength} // works the same as in input, but the value is markup
      readOnly={readOnly}
      defaultValue={defaultValue}
      label={readOnly ? '' : placeholder}
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
      onChange={handleChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  )
})
