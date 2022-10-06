import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },

  itemsWrapper: {
    marginTop: '5px',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '14px',
    marginLeft: '10px',
  },
  select: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
  },

  chipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '5px',
  },
  categoryTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '5px',
    marginTop: '10px',
    height: '220px',
  },
  editBtn: {
    marginTop: '5px',
  },
  bottomBlockWrapper: {
    marginTop: '5px',
    padding: '10px',
  },

  boxInfoWrapper: {
    marginTop: '5px',
    padding: '10px',

    display: 'flex',
  },

  editBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  superWrapper: {
    display: 'flex',
    gap: '5px',
  },
  barCodeActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  shippingLabelField: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  fieldsWrapper: {
    padding: '0 10px',
  },
  box: {
    width: '700px',
    border: '2px solid rgba(61, 81, 112, 0.3)',
    borderRadius: '10px',
  },

  imagesWrapper: {
    display: 'flex',
    padding: '5px',
    flexDirection: 'column',
  },

  photoWrapper: {
    width: '200px',
    marginLeft: '20px',
    minHeight: '150px',
  },

  imgBox: {
    width: '200px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5px',
  },
}))
