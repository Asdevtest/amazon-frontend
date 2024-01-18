import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    width: 660,
    position: 'relative',
    padding: 10,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100%',
    },
  },

  modalHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(1282)]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: 20,

    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },

  photoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,

    [theme.breakpoints.down(1282)]: {
      marginTop: 0,
    },
  },

  photoAndFilesTitle: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',

    [theme.breakpoints.down(768)]: {
      textAlign: 'center',
    },
  },

  buttonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,

    position: 'sticky',
    bottom: 0,
    right: 0,
    marginRight: 10,

    [theme.breakpoints.down(1282)]: {
      marginTop: 10,
    },
    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
      marginTop: '30px',
      gap: '20px',
    },
  },

  button: {
    width: '179px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
    gap: 15,

    [theme.breakpoints.down(1282)]: {
      gap: 5,
    },
  },

  numberInputFieldsWrapper: {
    height: 66,
    display: 'flex',
    gap: 15,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'row',
    },
  },

  numberInputField: {
    width: '100%',
    height: 40,
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: 5,
  },
}))
