import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    zIndex: 1200,
  },
  listItemText: {
    marginRight: '12px',
    fontSize: 13,
  },

  collapseText: {
    marginRight: '12px',
    fontSize: 25,
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
  },

  badge: {
    position: 'absolute',
    top: 15,
    left: 20,
    height: 20,
    width: 20,
    background: theme.palette.primary.main,

    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  redBadge: {
    position: 'absolute',
    top: 15,
    left: 20,
    height: 20,
    width: 20,
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',

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
    '&:hover': {backgroundColor: '#0000ff0a'},
  },

  subCategory: {
    padding: '0 20px 0 56px',
    width: '100%',
    // color: theme.palette.text.second,
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    height: 45,

    padding: '0 0px 10px 15px',
    '&:hover': {
      // backgroundColor: '#CCE2FF',
      backgroundColor: theme.palette.background.second,
    },
  },

  hideOnModile: {
    display: 'block',
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}))
