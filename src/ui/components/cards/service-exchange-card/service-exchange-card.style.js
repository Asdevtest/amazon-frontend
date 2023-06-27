/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    height: 550,
    width: 375,

    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    backgroundColor: theme.palette.background.general,
    padding: '35px 20px',

    marginBottom: 40,
    marginLeft: 5,
  },

  cardCarouselWrapper: {
    height: 180,
    width: 335,
    marginBottom: 40,
  },

  carouselImage: {
    width: 277,
    objectFit: 'contain',

    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  titleWrapper: {
    marginBottom: 10,
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

  descriptionWrapper: {
    marginBottom: 15,
  },

  cardDescription: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',

    height: 76,
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
    justifyContent: 'space-between',
    gap: 10,
    padding: '0 30px',

    marginBottom: 31,
  },

  detailsWrapperAll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '0 30px',

    marginBottom: 31,
  },

  detailsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 10,
  },

  detailsSubWrapperAll: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  openBtn: {
    padding: '0 75px',
    height: 40,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  cardImg: {
    width: 28,
    height: 28,
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
  },
}))
