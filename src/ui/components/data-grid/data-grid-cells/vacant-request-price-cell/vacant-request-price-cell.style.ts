import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  priceCellWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    gap: 5,
    flexWrap: 'wrap',

    justifyContent: 'center',
    alignItems: 'center',
  },

  priceCellWrapperAlignLeft: {
    justifyContent: 'flex-start',
  },

  priceText: {
    color: theme.palette.text.main,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
  },

  oldPrice: {
    textDecoration: 'line-through',
  },

  newPrice: {
    color: '#FB1D5B',
    fontWeight: 600,
  },
}))
