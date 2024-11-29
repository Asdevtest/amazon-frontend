import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '1090px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  blockTitle: {
    fontWeight: 600,
  },

  reviewsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  reviews: {
    maxHeight: 'unset',
    height: '245px',
    paddingRight: '0px',
  },

  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '600px',
    flex: 1,
  },
}))
