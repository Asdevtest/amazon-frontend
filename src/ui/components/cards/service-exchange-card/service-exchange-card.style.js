import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardWrapper: {
    height: 550,
    width: '100%',
    padding: '35px 20px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 7,
  },

  cardTitle: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  cardDescription: {
    height: 95,
    marginBottom: 10,
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
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
    textTransform: 'capitalize',
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

  openBtn: {
    padding: '0 75px',
    height: 40,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  gallery: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
}))
