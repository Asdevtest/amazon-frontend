import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      width: '30%',
      maxWidth: '100%',
      padding: 0,
    },
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
    color: theme.palette.text.general,
  },
  subTabWrapper: {
    height: '98px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typoNoReviews: {
    textAlign: 'center',
  },
  selected: {
    color: theme.palette.primary.main,
    textTransform: 'none',
  },

  mainWrapper: {
    width: '100%',
  },
}))
