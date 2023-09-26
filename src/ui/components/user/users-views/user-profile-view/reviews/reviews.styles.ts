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
    border: '1px solid #e0e0e0',
  },

  reviewList: {
    padding: '5px 5px',
    margin: '10px 5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '632px',
    overflow: 'auto',
  },
}))
