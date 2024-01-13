import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 340,
    height: '100%',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
    borderRadius: 12,
    boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.17)',
  },

  information: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  blueBackgroundForIcon: {
    color: theme.palette.primary.main,
  },
}))
