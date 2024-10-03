import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  сhatsListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '312px',

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

  chatsList: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    overflowY: 'scroll',
    paddingRight: '5px',
    boxShadow: theme.palette.boxShadow.box,
    borderRadius: '20px 0 0 20px',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '1px',
      '::-webkit-scrollbar': {
        display: 'block',
      },
    },
  },
}))
