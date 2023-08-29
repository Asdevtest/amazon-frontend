/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    height: 165,
    width: 800,
    padding: '20px 20px 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.paper,
    backgroundColor: theme.palette.background.general,
  },

  cardCarouselWrapper: {
    height: 105,
    width: 220,
  },

  carouselImage: {
    height: 96,
    objectFit: 'contain',
    width: '100%',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  titleAndDescriptionWrapper: {
    width: 275,
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
    marginBottom: 10,

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  cardDescription: {
    fontSize: '14px',
    lineHeight: '19px',
    height: 57,
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    marginBottom: 10,

    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  detailedDescription: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  detailTitle: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },

  detailDescription: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },

  detailsWrapper: {
    display: 'flex',
    gap: 30,
  },

  detailsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  openBtn: {
    padding: '0 75px',
    height: 40,
  },

  detailsAndButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
  },

  cardImg: {
    width: 28,
    height: 28,
  },

  detailsWrapperAll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  detailsSubWrapperAll: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
