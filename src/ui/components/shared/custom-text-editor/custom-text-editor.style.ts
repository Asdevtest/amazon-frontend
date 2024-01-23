import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
  },

  editorContainer: {},

  editor: {
    width: '100%',
    minHeight: 150,
    maxHeight: 1550,
    padding: 10,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 7,
    fontSize: 16,
    lineHeight: '22px',
    cursor: 'text',

    '.public-DraftStyleDefault-block': {
      margin: '0 !important',
    },
  },

  readOnly: {
    cursor: 'auto',
    background: `${theme.palette.input.customBorder} !important`,
  },

  editorBorderError: {
    border: `1px solid ${theme.palette.text.red}`,
  },

  focus: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  toolbar: {
    padding: '0 !important',
    margin: '0 !important',
    justifyContent: 'flex-end !important',
    fontSize: '0 !important',
    background: 'none !important',
    border: 'none !important',
    borderRadius: '0 !important',
    cursor: 'auto !important',

    '.rdw-option-active': {
      // color: `${theme.palette.primary.main} !important`,
      background: `${theme.palette.input.customBorder} !important`,
    },
  },

  toolbarButtons: {
    margin: '0 !important',
    background: 'none !important',
    cursor: 'auto !important',
  },

  toolbarButton: {
    margin: '0 !important',
    width: '20px !important',
    minWidth: '20px !important',
    background: 'none !important',
    border: 'none !important',
    borderRadius: '0 !important',
    boxShadow: 'none !important',
    cursor: 'pointer !important',
    opacity: '1 !important',

    '&:hover': {
      opacity: '0.5 !important',
    },
  },
}))
