import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '49%',
    height: 165,
    padding: 15,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 16,
  },

  image: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  descriptionWrapper: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
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

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  detailsAndButtonWrapper: {
    width: 230,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },

  detailsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
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
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  detailsWrapperAll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}))
