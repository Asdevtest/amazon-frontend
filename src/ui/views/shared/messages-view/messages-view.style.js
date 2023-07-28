export const styles = theme => ({
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 80px)',
    overflow: 'hidden',
    paddingTop: 10,
  },

  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 305,
    height: 40,
  },

  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },

  header: {
    height: 40,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  leftSideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  arrowBackIconWrapper: {
    display: 'none',
  },

  arrowBackIcon: {
    display: 'none',
  },

  rersonalWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  avatar: {
    width: 40,
    height: 40,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  opponentName: {
    maxWidth: 200,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.general,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  usersCount: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  searchResult: {
    width: 140,
    color: theme.palette.text.second,
  },

  rightSideHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
  },

  noticesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },

  noticesTextActive: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  noticesTextNotActive: {
    color: '#c4c4c4',
  },

  newDialogBtn: {
    height: 40,
    padding: '0 25px',
    marginLeft: 30,
  },

  noSelectedChatWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    background: theme.palette.background.general,
    borderRadius: '0 7px 7px 0',
    boxShadow: theme.palette.boxShadow.paper,
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '93px !important',
    color: theme.palette.primary.main,
  },

  '@media (max-width: 768px)': {
    wrapper: {
      padding: 10,
      height: '100%',
    },

    arrowBackIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: theme.palette.background.second,
    },

    arrowBackIcon: {
      marginRight: 5,
      color: theme.palette.primary.main,
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
