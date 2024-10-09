import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  сhatsListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: '300px',
    width: '300px',

    gap: '10px',

    padding: '10px',
    paddingRight: '5px',

    '@container (min-width: 1200px)': {
      // backgroundColor: 'blue',
    },
  },

  collapseIcon: {
    color: theme.palette.primary.main,
  },

  chatControls: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  searchInput: {
    flex: '1',
    width: 'unset',
  },
}))
