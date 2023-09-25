import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  boxAndPrepIdContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  boxAndPrepIdTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.general,
  },

  boxAndPrepIdInput: {
    width: 240,
    height: 40,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 7,
  },

  input: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  superBoxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  superBoxIconContainer: {
    padding: '5px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 7,
  },

  superBoxIcon: {
    width: 28,
    height: 28,
  },

  superBoxText: {
    fontSize: 22,
    lineHeight: '28px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  updatedContainer: {
    marginLeft: 'auto',
    display: 'flex',
    gap: 10,
  },

  updatedText: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.second,
  },

  updatedTitle: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  divider: {
    height: 1,
    width: '100%',
    background: '#E0E0E0',
  },

  information: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  informationContainerMinGap: {
    gap: 17,
  },

  informationTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  informationText: {
    minWidth: 150,
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  informationUser: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 400,
    color: theme.palette.text.general,
  },

  switcherWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  informationTitleMargin: {
    marginTop: 20,
  },

  blueColor: {
    color: theme.palette.primary.main,
  },

  commentsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
  },

  commentField: {
    height: 'auto',
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    margin: 0,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  closeBtn: {
    padding: '0 15px',
    color: theme.palette.text.general,
  },
  // stopped

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
