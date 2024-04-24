import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardWrapper: {
    height: 165,
    width: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 7,
  },

  titleAndDescriptionWrapper: {
    width: 320,
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
    maxWidth: 95,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    textTransform: 'capitalize',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  detailsAndButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  detailsWrapper: {
    display: 'flex',
    gap: 20,
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
    gap: 5,
  },

  serviceTypeWrapper: {
    width: '81px',
  },

  performerWrapper: {
    width: '140px',
  },
}))
