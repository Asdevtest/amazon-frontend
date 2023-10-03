import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardWrapper: {
    height: 165,
    width: 800,
    padding: '20px 20px 20px 0',
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 7,
  },

  photosWrapper: {
    padding: '10px 50px',
  },

  titleAndDescriptionWrapper: {
    width: 275,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  cardDescription: {
    maxHeight: 76,
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },

  detailedDescription: {
    width: 'max-content',
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

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
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
