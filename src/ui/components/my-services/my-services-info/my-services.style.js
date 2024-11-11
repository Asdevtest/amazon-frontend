import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '20px',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 16,
  },

  userWrapper: {
    maxHeight: 400,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  userInfoAndFooterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  userInfoWrapper: {
    display: 'flex',
    gap: 20,
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

  announcementText: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
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
    justifyContent: 'flex-end',
    gap: 10,
  },

  descriptionTextWrapper: {
    width: '100%',
    maxHeight: 76,
    overflowY: 'auto',
  },
}))
