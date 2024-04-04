import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 235,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  switcherWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  twoLines: {
    height: 38,
  },

  textSecond: {
    color: theme.palette.text.second,
  },

  textAlert: {
    display: 'inline-block',
    color: theme.palette.other.rejected,
  },
}))
