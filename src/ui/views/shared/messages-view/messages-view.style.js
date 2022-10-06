// import {createStyles} from '@mui/material'

export const styles = () => ({
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  opponentName: {
    marginLeft: 15,
    fontWeight: 600,
    fontSize: 18,
    color: '#001029',

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  opponentWrapper: {
    display: 'flex',
    marginLeft: 20,
  },
<<<<<<< HEAD

  '@media (max-width: 768px)': {
    noticesTextActive: {
      display: 'none',
    },
    noticesTextNoActive: {
      display: 'none',
    },
    chatHeaderWrapper: {
      flexDirection: 'column',
      gap: '15px',
      marginBottom: 20,
    },
    searchInput: {
      width: '100%',
    },
    searchContainer: {
      width: '100%',
    },
    leftSide: {
      width: '100%',
      // flexDirection: 'column',
    },
    rightSide: {
      width: '100%',
      justifyContent: 'space-between',
    },
    hideChatHeaderWrapper: {
      display: 'none',
    },

    '@media (max-width: 768px)': {
      chatWrapper: {
        height: '100%',
        padding: '0 10px',
      },
      chatHeaderWrapper: {
        padding: '0 10px',
      },
      newDialogBtn: {
        width: '223px',
      },
    },
  },
}))
=======
})
>>>>>>> 56997012... success migration on 5 mui
