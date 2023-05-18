/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    height: 165,

    width: 800,

    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    backgroundColor: theme.palette.background.general,

    padding: '20px 20px 20px 0',

    marginBottom: 30,
  },

  nameWrapper: {},
  cardCarouselWrapper: {
    height: 105,
    width: 220,
  },

  carouselImage: {
    height: 96,
    objectFit: 'contain',

    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  titleAndDescriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    width: 275,
  },

  cardTitle: {
    width: '100%',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.general,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardDescription: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',

    maxHeight: 76,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
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
