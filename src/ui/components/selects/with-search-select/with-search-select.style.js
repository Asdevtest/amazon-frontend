export const styles = theme => ({
  root: {
    width: 280,
    height: 36,
    position: 'relative',

    display: 'visible !important',
  },

  disableRoot: {
    opacity: '.7',
  },

  searchInput: {
    width: '100%',
    marginBottom: 20,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  mainWrapper: {
    width: '100%',

    border: '1px solid #006CFF',
    borderRadius: 4,

    transition: '0.3s ease',
    maxHeight: 36,
    overflow: 'hidden',
    position: 'absolute',
  },

  selectorIsOpen: {
    backgroundColor: theme.palette.background.general,
    maxHeight: 400,
    position: 'absolute',

    overflow: 'visible !important',
  },

  chosenItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 36,

    marginBottom: 10,

    borderBottom: '1px solid #E0E0E0',

    padding: '0 17px',

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      backgroundColor: '#F4F4F4',
    },
  },

  disabledChosenItem: {
    cursor: 'auto',
    backgroundColor: theme.palette.input.customDisabled,

    '&:hover': {
      transform: 'none',

      backgroundColor: theme.palette.input.customDisabled,
    },
  },

  subMainWrapper: {
    padding: '10px 17px',
    width: 280,
  },

  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 300,
    overflow: 'auto',
    width: '100%',
    gap: 5,
  },

  button: {
    marginBottom: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',

    // textOverflow: 'ellipsis',
    // minHeight: '20px',

    height: 'auto !important',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  fieldNamesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 'max-content',
  },

  fieldName: {
    height: 20,
    whiteSpace: 'nowrap',
  },

  selectedItemName: {
    width: '90%',
    color: theme.palette.primary.main,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})
