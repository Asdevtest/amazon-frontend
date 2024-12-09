import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: 42,
    fontSize: 13,
    lineHeight: '15px',
    fontWeight: 500,
    color: theme.palette.text.general,
    borderLeft: `5px solid transparent`,
    paddingRight: '16px',

    transition: '0.3s ease',
    cursor: 'pointer',

    '&$selected': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent',
    },
    '&$selected:hover': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
    },
    '&:hover': { backgroundColor: 'rgba(0,123,255,0.3)' },

    [theme.breakpoints.down(1024)]: {
      height: 40,
    },
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
    background: 'linear-gradient(90deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  shortNavbarRoot: {
    paddingRight: 0,
    width: '100%',
  },

  selectedIcon: {
    color: `${theme.palette.primary.main} !important`,
  },
  notSelected: {
    color: theme.palette.text.general,
  },
  iconWrapper: {
    minWidth: '0',
    margin: '16px 16px 16px 11px',
  },

  badge: {
    position: 'absolute',
    top: 0,
    left: 25,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
  },

  bigBadge: {
    fontSize: '12px',
    lineHeight: '16px',
  },

  icon: {
    width: '24px !important',
    height: '24px !important',
    backgroundColor: 'none',
    color: theme.palette.text.general,
  },

  menuItem: {
    overflow: 'hidden',
    height: 'auto',
    width: '100%',
    borderRadius: 0,
    padding: 0,
    display: 'inline-flex',
    backgroundColor: 'inherit',
    color: theme.palette.text.general,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  bigBadgePadding: {
    paddingRight: '20px',
  },
}))
