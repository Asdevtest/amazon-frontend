import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  username: {
    color: theme.palette.text.primary,
    fontSize: '32px',
    fontWeight: 500,
  },
  text: {
    color: theme.palette.text.secondary,
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
    color: theme.palette.text.primary,
  },
  subTabWrapper: {
    height: '98px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typoNoHistory: {
    textAlign: 'center',
  },
  selected: {
    color: theme.palette.primary.main,
    textTransform: 'none',
  },
}))
