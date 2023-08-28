import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  closeBtn: {
    marginLeft: 40,
    color: theme.palette.text.general,
  },

  formContainer: {
    padding: '0 20px',
    width: '1040px',
    [theme.breakpoints.down(768)]: {
      padding: 0,
      width: '280px',
    },
  },

  itemInput: {
    width: 280,
    height: 40,
    marginLeft: 10,
    // marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    textAlign: 'center',
    fontSize: 16,
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    // marginBottom: 20,
    marginBottom: 5,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },

  trackNumberPhotoWrapper: {
    width: 225,
    height: 130,

    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 0 40px',
  },

  trackNumberPhoto: {
    maxWidth: 225,
    width: '100%',
    objectFit: 'contain',
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  commentsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    marginTop: 20,
  },

  commentField: {
    height: 'auto',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '20px',
      marginBottom: 0,
    },
  },

  storekeeperField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpdatedField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLinkWrapper: {
    marginLeft: '10px',
  },

  blocksWrapper: {
    display: 'flex',
    width: '1000px',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      justifyContent: 'space-between',
    },
  },

  blockWrapper: {
    width: '480px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  deliveryInfoWrapper: {
    width: '480px',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
    },
  },

  deliveryInfoField: {
    width: '225px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  imgBoxWrapper: {
    width: '100%',
    display: 'flex',
    marginTop: '30px',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  productsWrapper: {
    overflow: 'hidden',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  productWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '480px',
    overflow: 'hidden',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '280px',
    },
  },

  amazonTitle: {
    whiteSpace: 'pre-line',
    width: '225px',
    color: theme.palette.text.general,
    marginBottom: '20px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      marginBottom: '20px',
      marginTop: '20px',
    },
  },

  linkField: {
    whiteSpace: 'nowrap',
    overflowX: 'auto',

    color: theme.palette.text.second,

    marginLeft: 5,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  labelsInfoWrapper: {
    width: '480px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '27px',
    // marginTop: '20px',

    [theme.breakpoints.down(768)]: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
    },
  },

  checkboxWrapper: {
    marginBottom: '20px',
  },

  trackNumberPhotoBtn: {
    width: 225,
  },

  hsCodeBtn: {
    width: '100%',
  },

  imgSizesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '20px',
      marginTop: '20px',
    },
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    marginLeft: '20px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      marginLeft: 0,
    },
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },

  imgWrapper: {
    width: '181px',
    display: 'flex',
    flexDirection: 'column',
  },

  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0',
  },

  checkbox: {
    padding: 0,
    marginRight: 10,
  },

  alertText: {
    color: 'red',
    fontWeight: 'bold',
  },

  photoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '225px',
    height: 220,
    paddingBottom: 30,

    [theme.breakpoints.down(768)]: {
      width: '280px',
      height: '240px',
      paddingBottom: '10px',
    },
  },

  leftColumn: {
    width: '225px',
  },

  rightColumn: {
    width: '225px',
    [theme.breakpoints.down(768)]: {
      marginTop: '20px',
      width: '280px',
    },
  },

  asinWrapper: {
    display: 'flex',
    gap: '5px',

    '& > :nth-of-type(n)': {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '400',
      color: theme.palette.text.second,
    },
  },

  linkWrapper: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    marginRight: '10px',
  },

  countContainer: {
    marginTop: '10px',
  },

  barCodeWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    maxWidth: 225,
    height: 40,
  },

  barCode: { display: 'flex', gap: '5px' },
  titleSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '20px',
      marginBottom: '10px',
    },
  },

  titlePrepIdWrapper: {
    width: '280px',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    // gap: '20px',
    marginBottom: '20px',
  },

  titlePrepIdSubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  storekeeperFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 10px',
  },
  UpdatedWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    marginLeft: 10,
  },

  divider: {
    backgroundColor: '#E0E0E0',
    margin: '0 -40px 15px -40px',
    [theme.breakpoints.down(768)]: {
      backgroundColor: '#E0E0E0',
      margin: '0 -20px 15px -20px',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  typoSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },
  copyAsin: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  batchIdWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    margin: '0 10px',
  },

  batchId: {
    marginBottom: 20,
    color: theme.palette.text.second,
  },

  inputField: {
    width: 225,
    height: 40,
  },

  shortInputField: {
    height: 40,
  },

  updatedAt: {
    color: theme.palette.text.second,
    marginLeft: 10,
  },
  containerField: {
    [theme.breakpoints.down(768)]: {
      magrin: 0,
    },
  },

  priorityWrapper: {
    width: 210,
  },

  rushOrderWrapper: {
    display: 'flex',
    marginBottom: 15,
  },

  rushOrderImg: {
    marginRight: 10,
  },

  rushOrder: {
    color: theme.palette.text.main,
  },
}))
