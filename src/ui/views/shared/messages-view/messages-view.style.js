export const styles = theme => ({
  chatWrapper: {
    width: '100%',
    height: '778px',
  },

  searchInput: {
    // border: `1px solid ${theme.palette.primary.main}`,

    border: `1px solid ${theme.palette.primary.main}`,

    width: 296,
    height: 36,
  },

  searchResult: {
    color: theme.palette.text.second,
  },

  searchIconBtn: {
    color: theme.palette.text.second,

    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  searchDisabledIconBtn: {
    color: theme.palette.action.disabled,

    cursor: 'auto',

    '&:hover': {
      transform: 'none',
    },
  },

  dropUpOrDownWrapper: {
    display: 'flex',
    gap: 10,
    margin: '0 15px',
  },

  searchResultNum: {
    color: theme.palette.text.general,
    marginLeft: 5,
  },

  searchResultWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },

  searchContainer: {
    width: 'auto',
    margin: 0,
  },

  chatSelectedWrapper: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
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
    color: theme.palette.primary.main,
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
    color: theme.palette.primary.main,

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
    color: theme.palette.text.general,

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: 200,

    // cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    // transition: '.3s ease',

    // '&:hover': {
    //   transform: 'scale(1.01)',
    //   opacity: '0.8',
    // },
  },

  usersCount: {
    marginLeft: 15,
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
  },

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

      padding: '0 10px',
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

    chatWrapper: {
      height: '100%',
      padding: '0 10px',
    },

    newDialogBtn: {
      width: '223px',
    },
  },
})
