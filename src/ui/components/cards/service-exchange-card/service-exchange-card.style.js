import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    width: 375,
    height: 550,
    padding: '35px 20px',
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.paper,
    backgroundColor: theme.palette.background.general,

    marginBottom: 30,
  },

  cardCarouselWrapper: {
    height: 180,
    width: 335,
    marginBottom: 25,
  },

  carouselImage: {
    maxWidth: 277,
    width: '100%',
    objectFit: 'contain',

    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  cardTitle: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  cardDescription: {
    height: 57,
    fontSize: '14px',
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    marginBottom: 10,

    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  detailedDescription: {
    marginBottom: 20,
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
    justifyContent: 'space-between',
    gap: 10,
    padding: '0 20px',

    marginBottom: 20,
  },

  detailsWrapperAll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '0 20px',

    marginBottom: 20,
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
