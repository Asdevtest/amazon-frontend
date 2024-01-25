import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
  },

  mainWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,

    transition: 'opacity 0.3s ease-in-out',
  },

  transitioning: {
    opacity: 0,
  },

  active: {
    opacity: 1,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  arrowsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  arrowIcon: {
    cursor: 'pointer',
    width: '25px !important',
    height: '25px !important',
    color: theme.palette.primary.main,
  },

  arrowIconDisable: {
    color: '#C4C4C4',
    cursor: 'auto',
  },

  proposalTitle: {
    fontSize: 16,
    lineHeight: '25px',
    fontWeight: 600,
  },

  performerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 14,
    lineHeight: '19px',
  },

  blueTitle: {
    color: theme.palette.primary.main,
  },

  comment: {
    fontSize: 14,
    lineHeight: '19px',
    width: 450,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',

    [theme.breakpoints.down(1500)]: {
      width: '100%',
    },
  },

  customPerformerLink: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  actionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: '50%',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },

  button: {
    height: 30,
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },
}))
