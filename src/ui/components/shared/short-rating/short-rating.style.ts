import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  rating: {
    fontSize: 14,
    fontWeight: 600,

    lineHeight: '1',
  },

  ratingMedium: {
    fontSize: 18,
  },
}))
