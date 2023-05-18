import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '14px',
    marginLeft: '10px',
  },
  select: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },

  chipWrapper: {
    display: 'flex',
    marginTop: '10px',
    padding: '5px',
  },
  categoryTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
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
}))
