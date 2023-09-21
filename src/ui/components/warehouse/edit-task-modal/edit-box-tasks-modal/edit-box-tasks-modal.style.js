import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '700px',
    [theme.breakpoints.down(1282)]: {
      // height: 'calc(100vh - 145px)',
      minHeight: 500,
      minWidth: 715,
      overflowY: 'auto',
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
      maxWidth: '520px',
    },
  },
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '24px',
    [theme.breakpoints.down(1282)]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '22px',
      marginBottom: '24px',
    },
  },

  boxCode: {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '30px 0px',

    [theme.breakpoints.down(1282)]: {
      margin: '15px 0px',
    },
  },

  imageFileInputWrapper: {
    width: '700px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  input: {
    width: '400px',
  },

  saveButton: {
    width: '179px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },
  cancelButton: {
    width: '179px',
    height: '40px',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },
  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '20px',
    gap: 15,
    [theme.breakpoints.down(1282)]: {
      marginTop: 10,
      gap: 5,
    },
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  numberInputFieldsWrapper: {
    width: '100%',
    height: 66,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 15,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'row',
    },
  },
  numberInputField: {
    width: 222,
    height: 40,
    margin: 0,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '30px',
    gap: '20px',

    [theme.breakpoints.down(1282)]: {
      marginTop: 10,
    },
    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
      marginTop: '30px',
      gap: '20px',
    },
  },

  photoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,

    [theme.breakpoints.down(1282)]: {
      marginTop: 0,
    },
  },

  photoAndFilesTitle: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    marginBottom: '10px',
    [theme.breakpoints.down(768)]: {
      textAlign: 'center',
    },
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: '5px !important',
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: theme.palette.text.second,
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

  customSwitcherWrapper: {
    width: 'fit-content',
  },
}))
