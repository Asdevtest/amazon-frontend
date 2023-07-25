/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { cx } from '@emotion/css'
import { EditorState, convertToRaw } from 'draft-js'
import { observer } from 'mobx-react'
import MUIRichTextEditor from 'mui-rte'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './custom-text-editor.style'

const TextAlign = ({ children, textAlign }) => <span style={{ textAlign: `${textAlign}` }}>{children}</span>

export const CustomTextEditor = observer(props => {
  const { conditions = '', changeConditions, readOnly, editorMaxHeight, verticalResize, textToCheck } = props

  const { classes: classNames } = useClassNames()

  const isJSON = text => {
    try {
      const res = JSON.parse(text)
      if (typeof res === 'number') {
        throw new Error()
      }
      return text // setValue(text)
    } catch (error) {
      const editorState = EditorState.createWithText(text)
      const serializedEditorState = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

      // setValue(serializedEditorState)
      return serializedEditorState
    }
  }

  const [value, setValue] = useState(() => isJSON(conditions) || '')

  const richTextEditorRef = useRef(null)

  const handleSave = () => {
    richTextEditorRef.current.save()
  }

  useEffect(() => {
    handleSave()
  }, [])

  useEffect(() => {
    setValue(isJSON(conditions))
  }, [conditions])

  return (
    <div className={classNames.richTextEditorWrapper}>
      {!readOnly && (
        <Typography className={classNames.richTextEditorTitle}>
          {t(TranslationKey['Describe your task']) + '*'}
        </Typography>
      )}

      <div className={classNames.richTextEditorSubWrapper} onClick={() => richTextEditorRef.current.focus()}>
        <MUIRichTextEditor
          ref={richTextEditorRef}
          maxLength={6000}
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
            root: classNames.root,
            container: classNames.container,
            editor: cx(classNames.editor, editorMaxHeight, {
              [classNames.verticalResize]: verticalResize,
              [classNames.editorBorder]: !readOnly,
            }),
            editorContainer: classNames.editorContainer,
            placeHolder: classNames.placeHolder,
            toolbar: classNames.toolbar,
          }}
          onBlur={() => {
            if (changeConditions) {
              handleSave()
            }
          }}
          onChange={EditorState => {
            if (changeConditions) {
              textToCheck(EditorState.getCurrentContent().getPlainText())
            }
          }}
          onSave={text => {
            changeConditions && changeConditions(text)
          }}
        />
      </div>
    </div>
  )
})
