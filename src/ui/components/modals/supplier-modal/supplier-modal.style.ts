import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '1090px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontWeight: 600,
    },
  },

  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '600px',
  },
}))
