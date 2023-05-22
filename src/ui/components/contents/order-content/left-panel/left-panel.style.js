import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  orderContainer: {
    padding: '15px 15px',
    width: '500px',
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
    margin: '0 50px 0 0',
    objectFit: 'cover',
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

  documentsButton: {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    textTransform: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '34px 0 30px',
  },

  asinTypo: {
    color: theme.palette.text.second,
  },
  divider: {
    margin: '10px 0',
  },
  lastDivider: {
    margin: '16px 0',
  },
  collapsedWrapper: {
    textAlign: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    marginTop: '79px',
  },

  copyValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '19px',
  },
}))
