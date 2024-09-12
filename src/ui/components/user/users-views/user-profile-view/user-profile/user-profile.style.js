import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 20,
    display: 'flex',
    gap: 20,
  },

  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  userInfoConatiner: {
    display: 'flex',
    gap: 20,
  },

  avatarWrapper: {
    position: 'relative',
    cursor: 'pointer',
    height: 140,
    width: 140,
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },

  username: {
    fontSize: 22,
    lineHeight: '30px',
    fontWeight: 500,
  },

  userEmail: {
    fontWeight: 600,
  },

  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  userRating: {
    fontSize: '16px',
  },

  userInfoButtons: {
    display: 'flex',
    gap: 10,
  },

  roles: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  rightSideWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  leaveReviewBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
