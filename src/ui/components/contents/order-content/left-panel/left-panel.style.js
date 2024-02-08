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

  containerTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
  },

  divider: {
    margin: '10px 0',
  },
  lastDivider: {
    margin: '16px 0',
  },
  collapsedWrapper: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '79px',
  },

  productInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
}))
