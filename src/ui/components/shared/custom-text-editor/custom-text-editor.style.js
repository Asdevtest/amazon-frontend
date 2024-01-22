import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  editorTitle: {
    position: 'absolute',
    top: 10,
    left: 0,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  editor: {
    width: '100%',
    minHeight: 184,
    maxHeight: 1550,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 7,
  },

  verticalResize: {
    resize: 'vertical',
  },

  editorBorderError: {
    border: `1px solid ${theme.palette.text.red}`,
  },

  noneBorder: {
    border: 'none',
    borderRadius: 0,
  },

  container: {
    margin: '0 !important',
  },

  editorContainer: {
    padding: '10px 16px !important',
    margin: '0 !important',
    width: '100% !important',
    height: '100% !important',
    borderRadius: 7,
  },

  editorContainerReadOnly: {
    background: theme.palette.input.customBorder,
  },

  editorContainerNotStyles: {
    background: 'none',
    padding: '0 !important',
    borderRadius: 0,
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',

    '.MuiIconButton-colorPrimary': {
      color: theme.palette.primary.main,
    },
  },
}))
