import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    height: '148px',
    backgroundColor: theme.palette.background.general,
    // boxShadow: '0px 2px 11px 2px #DFDFDF',
    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    padding: '30px 20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: theme.palette.text.second,
    textAlign: 'end',
    width: '140px',
  },
  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: theme.palette.text.general,
    textAlign: 'end',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  },
}))
