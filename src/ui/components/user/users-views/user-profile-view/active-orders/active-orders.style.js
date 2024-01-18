import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  tabContent: {
    minHeight: '120px',
  },
  tabsHeadContainer: {
    borderBottom: '1px solid rgb(217, 222, 229)',
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },

  mainTitle: {
    marginTop: '48px',
  },
  noActiveOffers: {
    textAlign: 'center',
  },
  offersWrapper: {
    minHeight: '98px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  selected: {
    color: theme.palette.primary.main,
    textTransform: 'none',
  },
}))
