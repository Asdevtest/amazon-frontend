import { makeStyles } from 'tss-react/mui'

export const useReviewsFormStyles = makeStyles()(theme => ({
  root: {
    width: 'calc(810px - 60px)',
  },

  modalHeader: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',

    '& > div': {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
  },

  userReviewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  reviewsWrapper: {
    padding: '15px 10px',
    border: '1px solid #e0e0e0',
    borderRight: 'none',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '700px',
    overflow: 'auto',
  },

  userLink: {
    fontSize: '18px',
    fontWeight: '600',
  },

  footerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30px',
  },

  closeButton: {
    width: '224px',
    height: '40px',
    color: theme.palette.primary.main,
  },
}))
