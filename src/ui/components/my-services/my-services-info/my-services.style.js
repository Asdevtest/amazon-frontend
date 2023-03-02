/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '30px 40px',
  },
  userWrapper: {
    height: 230,

    display: 'flex',
    alignItems: 'flex-start',
  },
  userInfoAndMoreInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 20,
  },

  userInfoAndFooterWrapper: {
    height: '100%',
    width: 1115,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

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

    color: theme.palette.primary.main,
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

  userCarouselWrapper: {
    width: 391,
    height: 180,
  },
  carouselImage: {
    height: '150px !important',
    objectFit: 'contain',

    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
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
  backButton: {
    padding: '0 26px',
  },
}))
