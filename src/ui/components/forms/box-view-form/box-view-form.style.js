import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  closeBtn: {
    marginLeft: 40,
  },

  formContainer: {
    padding: '0 20px',
    width: '1040px',
    [theme.breakpoints.down(768)]: {
      padding: 0,
      width: '280px',
    },
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    marginBottom: 20,
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },

  trackNumberPhoto: {
    width: 225,
    height: 130,
    objectFit: 'contain',
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
    margin: 0,
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

  carouselWrapper: {
    width: '240px',
    display: 'flex',
    justifyContent: 'center',
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

  imgBox: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  noImgBox: {
    width: '240px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  productsWrapper: {
    overflow: 'auto',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  productWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '480px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '280px',
    },
  },

  productSubWrapper: {
    display: 'flex',
    marginBottom: '10px',
    alignItems: 'flex-start',
  },

  countField: {
    // width: '120px',
  },

  amazonTitle: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '225px',
    color: theme.palette.text.general,
    marginBottom: '20px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '280px',
      marginBottom: '20px',
      marginTop: '20px',
    },
  },

  linkFieldWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    maxWidth: 225,
    height: 40,

    border: `1px solid ${theme.palette.input.customBorder}`,

    borderRadius: '4px',
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

  trackNumberPhotoBtn: {
    width: 225,
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
    justifyContent: 'end',
    width: '100%',
    marginBottom: '0',
  },

  alertText: {
    color: 'red',
    fontWeight: 'bold',
  },

  photoWrapper: {
    width: '225px',
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

  copyImg: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    display: 'block',
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

  barCode: {display: 'flex', gap: '5px'},
  titleSubWrapper: {
    // width: '650px',
    display: 'flex',
    // justifyContent: 'space-between',
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
    width: 210,
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
  sizesLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#c4c4c4',
    cursor: 'pointer',
  },
  selectedLabel: {
    color: theme.palette.primary.main,
  },
  selectedIndicator: {
    backgroundColor: '#006CFF',
  },
  toggleItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  indicator: {
    display: 'block',
    backgroundColor: '#006CFF',
    width: '2px',
    height: '10px',
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
    width: 160,
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

  updatedAt: {
    color: theme.palette.text.second,
    marginLeft: 10,
  },
  containerField: {
    [theme.breakpoints.down(768)]: {
      magrin: 0,
    },
  },
}))
