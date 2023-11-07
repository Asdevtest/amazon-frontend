import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  batchProductsWrapper: {
    display: 'flex',
    alignItems: 'center',

    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    padding: '3px',
    width: '100%',
  },

  batchProductsBoxesLength: {
    fontSize: 26,
    fontWeight: 600,
    color: theme.palette.primary.main,
    paddingRight: 5,
  },

  batchProductsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },

  order: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '10px 0',
  },

  orderImg: {
    height: 60,
    width: 60,
    // objectFit: 'cover',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },

  batchProductInfoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  batchProductTitle: {
    whiteSpace: 'nowrap',
    maxWidth: 225,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  productInfoText: {
    fontSize: 13,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    width: 'fit-content',
  },

  amountBoxesWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  amountBoxesText: {
    width: 34,
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
  },
}))
