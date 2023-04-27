export const styles = theme => ({
  root: {
    // position: 'relative',
    height: 46,
    fontSize: 13,
    lineHeight: '15px',
    fontWeight: 500,
    color: theme.palette.text.general,
    borderLeft: `5px solid transparent`,
    paddingRight: '16px',

    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    '&$selected': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent',
    },
    '&$selected:hover': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
    },
    '&:hover': {backgroundColor: 'rgba(0,123,255,0.3)'},
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
    background: 'linear-gradient(90deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  shortNavbarRoot: {
    paddingRight: 0,
    width: 'unset',
  },

  selectedIcon: {
    color: `${theme.palette.primary.main} !important`,

    // color: theme.palette.primary.main,
  },
  notSelected: {
    // color: 'rgba(189, 194, 209, 1)',
    color: theme.palette.text.general,
  },
  iconWrapper: {
    // position: 'relative',
    minWidth: '0',
    margin: '16px 16px 16px 11px',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 30,
    width: 'fit-content',
    padding: '1px 6px',
    background: theme.palette.primary.main,
    borderRadius: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
  },

  bigBadge: {
    width: 'fit-content',
    padding: '1px 6px',
    background: theme.palette.primary.main,
    borderRadius: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '14px',
  },

  redBadge: {
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%) !important',
  },

  icon: {
    backgroundColor: 'none',
    // color: '#fff',

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
})
