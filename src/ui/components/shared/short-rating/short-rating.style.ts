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
    color: theme.palette.text.general,
    lineHeight: '1',
  },

  ratingMedium: {
    fontSize: 18,
  },
}))
