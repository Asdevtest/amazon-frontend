import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    zIndex: 1200,
  },
  listItemText: {
    marginRight: '12px',
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
    backgroundColor: theme.palette.primary.main,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  menuItem: {
    overflow: 'hidden',
    width: '100%',

    height: '50px',
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
}))
