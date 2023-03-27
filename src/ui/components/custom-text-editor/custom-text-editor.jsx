/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {cx} from '@emotion/css'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import {Button, Typography} from '@mui/material'

import {FC, useEffect, useRef, useState} from 'react'

import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import MUIRichTextEditor from 'mui-rte'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {useClassNames} from './custom-text-editor.style'

const TextAlign = ({children, textAlign}) => <Typography style={{textAlign: `${textAlign}`}}>{children}</Typography>

export const CustomTextEditor = observer(({placeHolder}) => {
  const {classes: classNames} = useClassNames()

  const [value, setValue] = useState('')

  // const contentState = value && convertFromRaw(toJS(value))
  // const editorState = EditorState.createWithContent(contentState)
  // console.log('editorState', editorState)

  const richTextEditorRef = useRef(null)

  const handleSave = () => {
    richTextEditorRef.current.save()
  }

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <div className={classNames.richTextEditorWrapper}>
      <Typography className={classNames.richTextEditorTitle}>
        {t(TranslationKey['Describe your task']) + '*'}
      </Typography>

      <MUIRichTextEditor
        ref={richTextEditorRef}
        disable
        label={placeHolder ?? t(TranslationKey['Task description'])}
        controls={[
          'bold',
          'underline',
          'strikethrough',
          'numberList',
          'bulletList',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
        ]}
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
          editor: classNames.editor,
          editorContainer: classNames.editorContainer,
          placeHolder: classNames.placeHolder,
          toolbar: classNames.toolbar,
        }}
        inlineToolbar={false}
        maxLength={4000}
        onChange={handleSave}
        onSave={text => {
          setValue(text)
        }}
      />
    </div>
  )
})
