import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
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
    display: 'flex',
    width: '480px',
  },

  deliveryInfoField: {
    width: '225px',
  },

  imgBoxWrapper: {
    width: '240px',
    display: 'flex',
    justifyContent: 'center',
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
    maxHeight: '400px',
    overflow: 'auto',
  },

  productWrapper: {
    display: 'flex',
  },

  countField: {
    width: '120px',
    marginLeft: '10px',
  },

  amazonTitle: {
    maxWidth: '240px',
    overflow: 'auto',
    height: '70px',
  },

  linkField: {
    maxWidth: '225px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  labelsInfoWrapper: {
    display: 'flex',
  },

  imgSizesWrapper: {
    display: 'flex',
    marginBottom: '20px',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5px',
    marginBottom: '0',
  },
}))
