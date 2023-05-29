import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '1480px',
    display: 'flex',
    padding: '10px 20px',
    height: '100%',
    // backgroundColor: theme.palette.background.second,

    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.down(1282)]: {
      width: 1150,
      maxHeight: 'calc(100vh - 145px)',
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
      maxWidth: '520px',
    },
  },

  buttonsMainWrapper: {
    display: 'flex',
    justifyContent: 'end',
    paddingTop: 20,
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  typeTaskWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  typeTaskTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.second,
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  typeTaskSubTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },
  form: {
    height: 606,
    overflow: 'auto',

    paddingRight: 10,

    [theme.breakpoints.down(1282)]: {
      height: 550,
      width: 'auto',
      overflowY: 'auto',
    },
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
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
  subTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  field: {
    flexBasis: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',
  },

  horizontalDivider: {
    backgroundColor: '#E0E0E0',
    margin: '20px 0',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },

  img: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  heightFieldAuto: {
    height: 258,
    width: 330,

    padding: 0,
    border: `1px solid ${theme.palette.input.customBorder}`,
    [theme.breakpoints.down(1282)]: {
      width: 260,
    },
    [theme.breakpoints.down(768)]: {
      height: 'auto',
      width: '100%',
      padding: 0,
    },
  },

  storekeeperCommentField: {
    [theme.breakpoints.down(1282)]: {
      height: 182,
    },
  },

  clientAndBuyerComment: {
    height: '100px',
    [theme.breakpoints.down(1282)]: {
      height: 62,
    },
  },

  commentsWrapper: {
    width: '400px',
    display: 'flex',
    gap: '30px',
    [theme.breakpoints.down(1282)]: {
      width: 'fit-content',
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
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

  imageAndFileInputWrapper: {
    width: '690px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      minWidth: '280px',
      display: 'flex',
      justifyContent: 'center',
    },
  },

  successBtn: {
    width: '183px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '121px',
      height: '40px',
    },
  },

  commentsAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: '0 15px 0 0',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
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

  closeButton: {
    width: '183px',
    height: '40px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',

    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
    },
  },

  buttonsWrapperMobile: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      // marginBottom: '20px',
    },
  },
  hideBlock: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  hideButton: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  buttonMobile: {
    [theme.breakpoints.down(768)]: {
      width: '183px',
      height: '40px',
    },
  },

  downloadButton: {
    padding: '0 20px',
    // width: 216,
    height: 40,
    gap: 5,
    marginLeft: 30,
  },

  modalSubHeader: {
    display: 'flex',
    alignItems: 'center',
  },
}))
