import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatInfoHeader: {
    display: 'flex',
    flexDirection: 'column',
  },

  chatInfoTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    p: {
      fontWeight: '600',
    },
  },

  chatInfoUser: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  chatEditWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
