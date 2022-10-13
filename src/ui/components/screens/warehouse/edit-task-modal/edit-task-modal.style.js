import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    width: '1480px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: '#001029',
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
    color: '#656565',
  },
  typeTaskSubTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: '#001029',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
  },
  warehouseInfoWrapper: {},
  ordersWrapper: {
    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
  button: {
    width: '183px',
    height: '40px',
  },
  subTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
  },
  field: {
    flexBasis: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',
  },
  divider: {
    width: '100%',
    flexGrow: 1,
    margin: '0 -20px',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(2.5),
  },

  horizontalDivider: {
    backgroundColor: '#E0E0E0',
    margin: '20px 0',
  },

  carouselBox: {
    height: '200px',
    width: '200px',
    objectFit: 'cover',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dividerSSS: {
    margin: '0 30px',
  },
  img: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
  },
  sectionTitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
  },
  subTitleSSS: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    width: '40px',
    height: '20px',
  },
  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  heightFieldAuto: {
    height: '185px',
    width: '330px',
  },
  commentsWrapper: {
    width: '400px',
    display: 'flex',
    gap: '30px',
  },
  filesInput: {
    width: '700px',
    height: '50px',
  },

  imageFileInputWrapper: {
    width: '690px',
  },

  imageAndFileInputWrapper: {
    width: '690px',
  },

  successBtn: {
    width: '183px',
    height: '40px',
  },

  commentsAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
  },

  buttons: {
    display: 'flex',
    gap: '20px',
  },

  cancelButton: {
    width: '183px',
    height: '40px',
    color: '#001029',
  },

  closeButton: {
    width: '183px',
    height: '40px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  photosWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '200px',
  },
  buttonsWrapperMobile: {
    display: 'none',
  },

  '@media (max-width: 768px)': {
    root: {
      width: '100%',
      maxWidth: '520px',
      overflow: 'hidden',
    },
    modalTitle: {
      display: 'none',
    },
    hideBlock: {
      display: 'none',
    },
    typeTaskTitle: {
      display: 'none',
    },
    typeTaskSubTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
    subTitle: {
      display: 'none',
    },

    heightFieldAuto: {
      height: '96px',
      width: '100%',
    },

    commentsWrapper: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    commentsAndFilesWrapper: {
      width: '100%',
      flexDirection: 'column',
    },
    imageFileInputWrapper: {
      width: '100%',

      padding: '0 10px',
    },
    imageAndFileInputWrapper: {
      width: '100%',
      minWidth: '280px',

      display: 'flex',
      justifyContent: 'center',
    },

    horizontalDivider: {
      display: 'none',
    },

    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    successBtn: {
      width: '121px',
      height: '40px',
    },
    cancelButton: {
      width: '121px',
      height: '40px',
    },
    buttonsWrapperMobile: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    hideButton: {
      display: 'none',
    },
    buttonMobile: {
      width: '183px',
      height: '40px',
    },
    buttonWrapper: {
      justifyContent: 'center',
    },
    photosWrapper: {
      width: '400px',
      height: '200px',
      marginLeft: '-50px',
    },
  },
}))
