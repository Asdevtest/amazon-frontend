import { makeStyles } from 'tss-react/mui'

export const useReviewsStyles = makeStyles()(theme => ({
  mainTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.palette.text.general,
    paddingBottom: '10px',
  },

  typoNoReviews: {
    textAlign: 'center',
  },

  mainWrapper: {
    width: '100%',
  },

  body: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '632px',
    overflow: 'auto',
  },
}))
