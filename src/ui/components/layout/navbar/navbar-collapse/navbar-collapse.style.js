import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  listItemText: {
    marginRight: 25,
    fontSize: 13,
    fontWeight: 500,
  },

  collapseText: {
    marginRight: '12px',
    fontSize: 25,
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
  },

  badgeContainer: {
    display: 'flex',
    maxWidth: 56,
    minWidth: 56,
    paddingLeft: '5px',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge: {
    margin: '0 auto',
    height: 20,
    width: 'fit-content',
    background: theme.palette.primary.main,

    padding: '1px 6px',

    fontSize: '12px',

    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  menuItem: {
    overflow: 'hidden',
    width: '100%',

    height: 46,
    padding: 0,
    display: 'flex',
    backgroundColor: 'inherit',
    borderRadius: 0,

    color: theme.palette.text.second,
    '&:hover': { backgroundColor: '#0000ff0a' },
  },

  redBadge: {
    borderRadius: '22px',
    padding: '1px 6px',
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%) !important',
  },

  bigBadge: {
    width: 'fit-content',
    padding: '1px 4px',
    background: theme.palette.primary.main,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '12px',
    lineHeight: '16px',
  },

  subCategory: {
    padding: '0 36px 0 0',
    width: '100%',
    height: '100%',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    cursor: 'pointer',
    transition: '0.3s ease',
    height: 45,

    padding: '0 0px 10px 15px',
    '&:hover': {
      backgroundColor: theme.palette.background.second,
    },
  },
}))
