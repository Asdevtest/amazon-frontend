import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '30px 40px',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 7,
  },

  userWrapper: {
    maxHeight: 400,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  userInfoAndFooterWrapper: {
    height: '100%',
    width: 1115,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  userInfoWrapper: {
    display: 'flex',
    gap: 15,
  },
  userInfoSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    gap: 5,
  },
  userRatingWrapper: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
  },

  userAvatar: {
    width: 63,
    height: 63,
  },
  reviewText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    padding: 0,
    height: 'auto !important',
  },

  announcementText: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    textTransform: 'capitalize',
  },
  regularText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
  },

  userMoreInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 15,
  },
  titleAndTaksTypeWrapper: {
    display: 'flex',
    gap: 100,
  },
  descriptionWrapper: {
    display: 'flex',
    gap: 10,
  },

  footerWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusWrapper: {
    display: 'flex',
    gap: 15,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 10,
  },
  editButton: {
    padding: '0 52px',
  },
  deleteButton: {
    padding: '0 34px',
  },
  backButton: {
    padding: '0 26px',
  },
  descriptionTextWrapper: {
    width: '100%',
    maxHeight: 76,

    overflowY: 'auto',
  },

  showFullDescription: {
    maxHeight: 'none',
  },

  photosWrapper: {
    width: 410,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsButton: {
    color: theme.palette.primary.main,
  },
}))
