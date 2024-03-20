import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 600,
  },

  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  userReviewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  reviewsList: {
    maxHeight: 625,
    overflow: 'auto',
    padding: 10,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    border: '1px solid #e0e0e0',
    borderRadius: '7px',
  },

  userLink: {
    fontSize: '18px',
    fontWeight: '600',
  },

  footerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

  closeButton: {
    width: 200,
    height: 40,
    color: theme.palette.primary.main,
  },
}))
