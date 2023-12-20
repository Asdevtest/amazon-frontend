import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  productLotDataBlock: {
    width: 1400,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  aboutProduct: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  productInfo: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifContent: 'flex-start',
    alignItems: 'center',
  },

  title: {
    fontSize: '22px',
    lineHeight: '26px',
    fontWeight: '600',
    color: theme.palette.text.general,
    display: 'flex',
    justifyContent: 'space-between',
  },

  img: {
    width: '60px',
    height: '60px',
  },

  productTitle: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    padding: '0 20px',
    fontWeight: '400',
    lineHeight: '19px',

    width: 325,
    fontSize: 14,
    color: theme.palette.text.general,
    height: 38,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  attributeTitle: {
    paddingRight: '5px',
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  sku: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  asin: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  tableWrapper: {
    height: 550,
    width: '100%',
  },
}))
