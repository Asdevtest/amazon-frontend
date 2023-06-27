import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  richTextEditorWrapper: {
    position: 'relative',

    width: '100%',
    height: '100%',
  },
  richTextEditorSubWrapper: {
    width: '100%',
    height: '100%',
  },
  richTextEditorTitle: {
    position: 'absolute',
    top: 10,
    left: 0,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  root: {
    width: '100%',
    height: '100%',
  },
  editor: {
    minHeight: 184,
    maxHeight: 1550,
    overflowY: 'auto',
  },
  verticalResize: {
    resize: 'vertical',
  },
  editorBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
  },
  editorContainer: {
    padding: '10px 16px !important',
    margin: '0px !important',
    width: '100% !important',
  },
  container: {
    width: '100%',
    height: '100%',
    margin: '0 !important',
    padding: 0,
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',

    '.MuiIconButton-colorPrimary': {
      color: theme.palette.primary.main,
    },
  },

  placeHolder: {
    margin: 0,
    padding: 0,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: `${theme.palette.text.gray} !important`,
  },
}))
