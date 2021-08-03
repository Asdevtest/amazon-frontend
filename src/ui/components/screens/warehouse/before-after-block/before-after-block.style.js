const {makeStyles} = require('@material-ui/core')

export const useClassNames = makeStyles(() => ({
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
  newBoxes: {},
  box: {
    minWidth: '300px',
    marginBottom: '20px',
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
  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    padding: '10px',
  },
  chipWrapper: {
    display: 'flex',
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
  },
  editBtn: {
    marginTop: '5px',
  },
  bottomBlockWrapper: {
    marginTop: '5px',
    padding: '10px',
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
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
    width: '250px',
    height: '45px',
    overflowX: 'scroll',
  },
  fieldsWrapper: {
    padding: '0 10px',
  },
}))
