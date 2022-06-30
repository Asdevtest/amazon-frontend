import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  root: {
    zIndex: 1200,
  },
  listItemText: {
    marginRight: '12px',
  },
  selected: {
    color: theme.palette.primary.main,
    border: '1px solid #006aff49',
  },

  badge: {
    position: 'absolute',
    top: 15,
    left: 20,
    height: 20,
    width: 20,
    backgroundColor: 'rgba(0,0,0, .1)',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },

  menuItem: {
    overflow: 'hidden',
    width: '100%',
    marginBottom: '10px',
    marginTop: '10px',
    height: '20px',
    padding: 0,
    display: 'flex',
    backgroundColor: 'inherit',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  subCategory: {
    padding: '0 20px 0 56px',
    width: '100%',
  },
}))
