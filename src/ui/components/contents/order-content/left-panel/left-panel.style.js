import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  orderContainer: {
    width: '100%',
  },
  amazonTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  product: {
    display: 'flex',
  },
  productImg: {
    height: '98px',
    width: '92px',
    margin: '0 20px 0 0',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
  },

  productInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
}))
