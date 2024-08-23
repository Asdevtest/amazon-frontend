import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardWrapper: {
    height: 450,
    width: '24%',
    padding: '20px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
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
    height: 57,
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  detailedDescription: {
    width: 'max-content',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    padding: '0 30px',
    marginBottom: 20,
  },

  detailsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  detailTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  detailDescription: {
    maxWidth: 120,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  detailsWrapperAll: {
    flexDirection: 'column',
  },

  detailsSubWrapperAll: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  image: {
    borderRadius: 16,
  },
}))
