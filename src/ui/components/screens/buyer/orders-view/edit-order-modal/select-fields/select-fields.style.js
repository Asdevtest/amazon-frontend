import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    minWidth: '230px',
  },
  nativeSelect: {
    width: '200px',
  },
  numInput: {
    width: '80px',
  },

  numWideInput: {
    width: '300px',
  },

  errorInput: {
    border: '1px solid red',
  },

  commentInput: {
    fontSize: '13px',
    height: 'auto',
    width: '100%',
    marginTop: '2px',
  },
  priceOptionsWrapper: {
    marginTop: '30px',
    display: 'inline-block',

    border: '1px solid rgba(0, 0, 0, .3)',
    borderRadius: '20px',
    padding: '10px',
  },
  disabledPriceOptionsWrapper: {
    opacity: '0.7',
  },

  noFlexElement: {
    marginBottom: '10px',
  },

  barCodeText: {
    width: '300px',
    height: '46px',
    overflowX: 'scroll',
  },
  barCodeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start',
  },
  totalPriceWrapper: {
    marginTop: '20px',
  },
  totalPrice: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '21px',
  },

  imageFileInputWrapper: {
    width: '500px',
  },

  imagesButton: {
    marginTop: '20px',
  },

  onLineWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))
