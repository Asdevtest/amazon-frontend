import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
  },
  warehouseInfoWrapper: {},
  ordersWrapper: {
    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10px',
    display: 'flex',
  },
  subTitle: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
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
    height: 'auto',
    minWidth: '380px',
  },
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  filesInput: {
    width: '700px',
    height: '50px',
  },

  imageFileInputWrapper: {
    maxWidth: '866px',
  },

  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
}))
