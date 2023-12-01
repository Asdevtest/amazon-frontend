import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  order: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '10px 0',
  },

  orderImg: {
    height: 64,
    width: 64,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },

  orderImageBig: {
    height: 100,
    width: 100,
  },

  orderImageSmall: {
    height: 56,
    width: 56,
  },

  orderTitle: {
    fontSize: '14px',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    maxWidth: 185,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  copyAsin: {
    width: '100%',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },

  orderText: {
    fontSize: 13,
    maxWidth: 165,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  orderTextSpan: {
    fontSize: 14,
    lineHeight: '19px',
    color: 'rgb(189, 194, 209)',
  },

  superboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginRight: 5,
  },

  superboxTypo: {
    margin: '0',
    color: theme.palette.primary.main,
    fontSize: '20px',
    fontWeight: '900px',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    width: 'fit-content',
  },

  OrderCellError: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },
}))
