import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: 30,
    width: '100%',
  },

  modalHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
      color: theme.palette.text.general,
      marginBottom: '27px',
    },
  },

  addButtonWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  addButtonWrapperMobile: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
  },

  addButton: {
    width: '216px',
    height: '40px',
    display: 'flex',
  },

  icon: {
    marginLeft: '16px',
  },

  boxesWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  divider: {
    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },
  },

  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '20px',

    [theme.breakpoints.down(1282)]: {
      marginTop: 15,
    },

    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
  },

  button: {
    width: '162px',
    height: '40px',

    [theme.breakpoints.down(768)]: {
      width: '121px',
    },
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  noImageText: {
    color: theme.palette.text.red,
  },
}))
