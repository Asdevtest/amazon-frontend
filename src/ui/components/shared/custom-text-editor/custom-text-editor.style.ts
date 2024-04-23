import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: 20,
    width: '100%',
    height: '100%',
  },

  container: {
    margin: '0 !important',
    height: '100%',
  },

  editorContainer: {
    margin: '0 !important',
    padding: '10px !important',

    '.public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': {
      paddingLeft: '20px !important',
    },
  },

  editorContainerReadOnly: {
    padding: '0 !important',
  },

  editor: {
    width: '100%',
    minHeight: 154,
    maxHeight: 900,
    overflowY: 'auto',
    fontSize: 16,
    lineHeight: '22px',
    wordBreak: 'break-word',

    '.public-DraftEditor-content': {
      minHeight: 130,
    },
  },

  allHeight: {
    minHeight: 0,
    maxHeight: '100%',

    '.public-DraftEditor-content': {
      minHeight: 0,
    },
  },

  editorToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
      color: theme.palette.text.general,
    },

    '.MuiIconButton-colorPrimary': {
      color: `${theme.palette.primary.main} !important`,
    },
  },

  verticalResize: {
    resize: 'vertical',
  },

  placeHolder: {
    height: '100%',
    fontSize: 16,
    lineHeight: '22px',
  },

  editorBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 7,
  },

  editorBorderError: {
    border: `1px solid ${theme.palette.text.red}`,
  },

  editorBorderFocus: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  title: {
    width: '100%',
  },
}))
