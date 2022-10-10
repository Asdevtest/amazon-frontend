import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  formContainer: {
    padding: '0 20px',
    width: '1040px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: '#001029',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  storekeeperField: {
    maxWidth: '250px',
    margin: '0',
  },
  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'flex-end',
  },

  blocksWrapper: {
    display: 'flex',
    width: '1000px',
    justifyContent: 'space-between',
  },

  blockWrapper: {
    width: '480px',
  },

  deliveryInfoWrapper: {
    width: '480px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  deliveryInfoField: {
    width: '225px',
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
    // width: '480px',
    // maxHeight: '450px',
    overflow: 'auto',
  },

  productWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    // height: '330px',
    width: '480px',

    // padding: '10px',
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
    color: '#001029',
    // overflow: 'auto',

    marginBottom: '20px',
  },

  linkField: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  labelsInfoWrapper: {
    width: '480px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '27px',
    marginTop: '20px',
  },

  imgSizesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    marginLeft: '20px',
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
  },

  leftColumn: {
    width: '225px',
  },

  rightColumn: {
    width: '225px',
  },

  asinWrapper: {
    display: 'flex',
    gap: '5px',

    '& > :nth-child(n)': {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '400',
      color: '#656565',
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

  barCode: {display: 'flex', gap: '5px'},
  titleSubWrapper: {
    width: '480px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  divider: {
    backgroundColor: '#E0E0E0',
    margin: '0 -40px 15px -40px',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
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
    color: '#007bff',
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    marginLeft: 10,
    color: '#007bff',
  },
  typoSpan: {
    marginLeft: 10,
    color: '#656565',
  },
  copyAsin: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  '@media (max-width: 768px)': {
    title: {
      fontSize: '16px',
      lineHeight: '22px',
    },
    formContainer: {
      padding: 0,
      width: '280px',
    },
    titleWrapper: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '20px',
      marginBottom: 0,
    },
    titleSubWrapper: {
      width: '280px',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '20px',
      marginBottom: '10px',
    },
    deliveryInfoWrapper: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
    },
    deliveryInfoField: {
      width: '280px',
    },
    productsWrapper: {
      width: '280px',
    },
    productWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '280px',
    },
    photoWrapper: {
      width: '280px',
      height: '240px',
      paddingBottom: '10px',
    },
    amazonTitle: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '280px',
      marginBottom: '20px',
      marginTop: '20px',
    },
    rightColumn: {
      marginTop: '20px',
      width: '280px',
    },
    blocksWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      justifyContent: 'space-between',
    },
    blockWrapper: {
      width: '280px',
    },
    imgSizesWrapper: {
      display: 'flex',
      flexDirection: 'column',

      gap: '20px',
      marginBottom: '20px',
      marginTop: '20px',
    },
    imgBoxWrapper: {
      width: '280px',
    },
    sizesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      marginLeft: 0,
    },
    labelsInfoWrapper: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
    },
    containerField: {
      magrin: 0,
    },
    divider: {
      backgroundColor: '#E0E0E0',
      margin: '0 -20px 15px -20px',
    },
  },
}))
