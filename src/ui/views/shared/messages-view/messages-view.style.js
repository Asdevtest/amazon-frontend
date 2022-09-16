import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  chatWrapper: {
    width: '100%',
    height: '778px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: 276,
    height: 36,
  },

  searchContainer: {
    width: 'auto',
    margin: 0,
  },

  chatHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  tooltipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },

  noticesTextActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#006CFF',
  },
  noticesTextNoActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#c4c4c4',
  },

  noticesIcon: {
    width: 18,
    height: 18,
    marginLeft: 20,
    transition: '.2s ease',
    color: '#006CFF',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  noticesIconOff: {
    color: '#c4c4c4',
  },

  newDialogBtn: {
    height: 40,
    padding: '0 25px',
    marginLeft: 30,
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
  },

  rightSide: {
    display: 'flex',
    alignItems: 'center',
  },

  avatarWrapper: {
    width: 40,
    height: 40,
  },

  opponentName: {
    marginLeft: 15,
    fontWeight: 600,
    fontSize: 18,
    color: '#001029',
  },

  opponentWrapper: {
    display: 'flex',
    marginLeft: 20,
  },
}))
