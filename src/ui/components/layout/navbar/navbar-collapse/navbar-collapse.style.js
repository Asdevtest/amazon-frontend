import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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

  badgeContainer: {
    display: 'flex',
    width: '56px',
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
    margin: '0 auto',
    width: 'fit-content',
    height: 20,
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%) !important',

    padding: '1px 6px',

    fontSize: '12px',

    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
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

  subCategory: {
    padding: '0 36px 0 0',
    width: '100%',
    height: '100%',
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
}))
