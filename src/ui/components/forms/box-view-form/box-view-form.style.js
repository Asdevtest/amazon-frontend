import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
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
    cursor: 'pointer',
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
  },

  imgWrapper: {
    width: '181px',
    display: 'flex',
    flexDirection: 'column',
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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
    cursor: 'pointer',

    display: 'block',
  },

  input: {
    zIndex: '0',
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
}))
