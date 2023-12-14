import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sabUserWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  userAvatar: {
    width: 66,
    height: 66,
  },

  sabUserInfoWrapper: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  userEmail: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },

  sabUserRatingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  ratingScore: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
  },

  sabUserRating: {
    marginLeft: 10,
    opacity: '1 !important',
  },
}))
