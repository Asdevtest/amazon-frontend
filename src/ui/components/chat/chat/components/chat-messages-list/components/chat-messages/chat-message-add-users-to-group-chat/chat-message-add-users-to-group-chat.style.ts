import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,

    [theme.breakpoints.down(768)]: {
      padding: '0 5px',
    },
  },

  groupText: {
    [theme.breakpoints.down(768)]: {
      fontSize: 14,
    },
  },

  usersWrapper: {
    display: 'flex',
    gap: 5,
    maxWidth: 350,
    flexWrap: 'wrap',

    [theme.breakpoints.down(768)]: {
      maxWidth: 100,
    },
  },

  user: {
    display: 'flex',
    alignItems: 'center',
  },
}))
