import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    minHeight: 165,
    height: 'fit-content',
    width: 800,
    padding: '20px 20px 20px 20px',
    background: theme.palette.background.general,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.paper,
    backgroundColor: theme.palette.background.general,

    marginBottom: 20,
  },

  cardCarouselWrapper: {
    height: 105,
    width: 220,
  },

  photosWrapper: {
    padding: '10px 50px',
  },

  titleAndDescriptionWrapper: {
    width: 275,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    margin: '10px 0',
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    marginBottom: 10,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  cardDescription: {
    maxHeight: 95,
    fontSize: '14px',
    lineHeight: '19px',
    height: 57,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
  },

  detailedDescription: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  detailTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  detailDescription: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
  },

  detailsAndButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '10px 0',
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
    marginBottom: 10,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
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
