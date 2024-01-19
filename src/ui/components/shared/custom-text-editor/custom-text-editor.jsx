import { EditorState, convertToRaw } from 'draft-js'
import { observer } from 'mobx-react'
import MUIRichTextEditor from 'mui-rte'
import { useEffect, useRef, useState } from 'react'

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-text-editor.style'

const TextAlign = ({ children, textAlign }) => <span style={{ textAlign: `${textAlign}` }}>{children}</span>

export const CustomTextEditor = observer(props => {
  const { conditions = '', changeConditions, readOnly, editorMaxHeight, verticalResize, textToCheck } = props

  const { classes: styles, cx } = useStyles()

  const richTextEditorRef = useRef(null)

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

  const [value, setValue] = useState(() => isJSON(conditions) || '')

  useEffect(() => {
    handleSave()
  }, [])

  useEffect(() => {
    setValue(isJSON(conditions))
  }, [conditions])

  const handleSave = () => {
    richTextEditorRef.current.save()
  }

  return (
    <div className={styles.richTextEditorWrapper}>
      {!readOnly && (
        <Typography className={styles.richTextEditorTitle}>{t(TranslationKey['Describe your task']) + '*'}</Typography>
      )}

      <div className={styles.richTextEditorSubWrapper} onClick={() => richTextEditorRef.current.focus()}>
        <MUIRichTextEditor
          ref={richTextEditorRef}
          maxLength={1000}
          readOnly={readOnly}
          defaultValue={value}
          label={!readOnly && t(TranslationKey['Task description'])}
          controls={
            readOnly
              ? []
              : [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'numberList',
                  'bulletList',
                  'justifyLeft',
                  'justifyCenter',
                  'justifyRight',
                  'justifyFull',
                ]
          }
          customControls={[
            {
              name: 'justifyLeft',
              icon: <FormatAlignLeftIcon />,
              type: 'block',
              blockWrapper: <TextAlign textAlign={'left'} />,
            },
            {
              name: 'justifyCenter',
              icon: <FormatAlignCenterIcon />,
              type: 'block',
              blockWrapper: <TextAlign textAlign={'center'} />,
            },

            {
              name: 'justifyRight',
              icon: <FormatAlignRightIcon />,
              type: 'block',
              blockWrapper: <TextAlign textAlign={'right'} />,
            },

            {
              name: 'justifyFull',
              icon: <FormatAlignJustifyIcon />,
              type: 'block',
              blockWrapper: <TextAlign textAlign={'justify'} />,
            },
          ]}
          classes={{
            root: styles.root,
            container: styles.container,
            editor: cx(styles.editor, editorMaxHeight, {
              [styles.verticalResize]: verticalResize,
              [styles.editorBorder]: !readOnly,
              [styles.editorBorderError]: value.length > 2048 && !readOnly,
            }),
            editorContainer: cx(styles.editorContainer, { [styles.editorContainerReadOnly]: readOnly }),
            placeHolder: styles.placeHolder,
            toolbar: styles.toolbar,
          }}
          onBlur={() => {
            if (changeConditions) {
              handleSave()
            }
          }}
          onChange={EditorState => {
            if (textToCheck) {
              textToCheck(EditorState.getCurrentContent().getPlainText())
            }
            handleSave()
          }}
          onSave={text => {
            changeConditions && changeConditions(text)
          }}
        />
      </div>
    </div>
  )
})
