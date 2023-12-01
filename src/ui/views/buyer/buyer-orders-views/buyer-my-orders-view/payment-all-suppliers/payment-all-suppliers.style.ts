import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  totalPriceWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 320,
    gap: 5,
  },

  totalPriceText: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    whiteSpace: 'nowrap',
    color: theme.palette.text.second,
  },

  totalPriceTextWrapper: {
    display: 'flex',
  },

  totalPrice: {
    color: theme.palette.primary.main,
  },
}))
