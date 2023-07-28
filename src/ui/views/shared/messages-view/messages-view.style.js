export const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '89vh',
  },

  chatHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  hideChatHeaderWrapper: {
    display: 'none',
  },

  leftSide: {
    display: 'flex',
    alignItems: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 296,
    height: 36,
  },

  chatSelectedWrapper: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },

  selectedChatPersonalInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
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
  },

  unMutedNotificationIcon: {
    color: '#AEAEAE',
    cursor: 'pointer',
    '&:hover': {
      color: '#656565',
    },
  },

  mutedNotificationIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      color: '#0056B2',
    },
  },

  usersCount: {
    marginLeft: 15,
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  searchResultWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },

  searchResult: {
    color: theme.palette.text.second,
  },

  rightSide: {
    display: 'flex',
    alignItems: 'center',
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

  newDialogBtn: {
    height: 40,
    padding: '0 25px',
    marginLeft: 30,
  },

  '@media (max-width: 768px)': {
    wrapper: {
      padding: 10,
      height: '100%',
    },

    chatHeaderWrapper: {
      gap: 10,
      marginBottom: 15,
    },

    leftSide: {
      width: '100%',
    },

    searchInput: {
      width: '100%',
      height: 40,
    },

    noticesTextActive: {
      display: 'none',
    },

    noticesTextNoActive: {
      display: 'none',
    },

    rightSide: {
      gap: 10,
    },

    tooltipWrapper: {
      padding: 8,
    },

    newDialogBtn: {
      width: 40,
      padding: 0,
      margin: 0,
      borderRadius: 7,
    },
  },
})
