import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 600,
  },

  notifyText: {
    color: theme.palette.text.red,
  },

  leftContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-start',
  },

  divider: {
    height: '100%',
  },

  rightContainer: {
    width: '80%',
  },

  fixedHeight: {
    height: 215,
  },

  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconAlarm: {
    width: 60,
    height: 60,
    color: theme.palette.primary.main,
  },
}))
