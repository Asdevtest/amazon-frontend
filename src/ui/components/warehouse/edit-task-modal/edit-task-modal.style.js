import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',

    [theme.breakpoints.down(768)]: {
      position: 'sticky',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  button: {
    width: '183px',
    height: '40px',
  },

  field: {
    flexBasis: '100%',
  },

  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  imageFileInputWrapper: {
    width: '690px',

    [theme.breakpoints.down(1282)]: {
      width: 550,
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
      padding: '0 10px',
    },
  },

  buttons: {
    display: 'flex',
    gap: '20px',
  },

  cancelButton: {
    width: '183px',
    height: '40px',
    color: theme.palette.text.general,

    zIndex: 999,

    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },
}))
