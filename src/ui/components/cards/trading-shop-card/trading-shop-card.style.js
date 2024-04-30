import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    height: '360px',

    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  subWrapper: {
    width: '77%',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  title: {
    fontWeight: 600,
    fontSize: 18,
  },

  shortInfoWrapper: {
    display: 'flex',
    margin: '40px 0 30px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  shortInfoContainer: {
    width: 'min-content',
    margin: 0,
  },

  shortInfoLabel: {
    fontSize: 14,
    color: '##656565',
    whiteSpace: 'nowrap',
  },

  shortInfoValue: {
    fontSize: 18,
  },

  description: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',

    width: '100%',
    fontSize: 16,

    height: 70,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  footer: {
    marginTop: 26,
    display: 'flex',
    alignItems: 'flex-end',
  },

  footerInfoWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
  },

  footerInfoContainer: {
    margin: '0 20px 0 0',
  },

  green: {
    color: 'green',
  },

  red: {
    color: 'red',
  },

  actionButton: {
    padding: '8px 60px',
  },

  percentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  status: {
    marginRight: 10,
  },

  statusIcon: {
    width: 12,
    height: 12,
    color: theme.palette.primary.main,
  },

  carouselImage: {
    width: 333,
    height: 241,
    cursor: 'pointer',
    objectFit: 'contain',
  },
}))
