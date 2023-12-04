import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 280,
    height: 36,
    position: 'relative',

    display: 'visible !important',
  },

  selectHeight: {
    height: 40,
  },

  disableRoot: {
    opacity: '.8',
  },

  searchInput: {
    width: 'calc(100% - 34px)',
    marginBottom: 20,
    marginLeft: 17,
  },

  icon: {
    color: theme.palette.primary.main,
  },
  darkIcon: {
    color: theme.palette.text.second,
  },

  disabledSelectedItemName: {
    color: theme.palette.text.general,
  },

  mainWrapper: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    transition: '0.3s ease',
    maxHeight: 36,
    overflow: 'hidden',
    position: 'absolute',
  },

  grayBorder: {
    height: 40,
    maxHeight: 40,
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  chosenItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    marginBottom: 10,
    // borderBottom: '1px solid #E0E0E0',
    padding: '0 17px',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
      backgroundColor: theme.palette.background.searchSelectHover,
    },
  },

  chosenItemNoHover: {
    height: 40,
    '&:hover': {
      transform: 'unset',
      backgroundColor: 'unset',
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
    padding: '10px 0',
    width: 280,
  },

  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 650,
    overflow: 'auto',
    width: '100%',
    gap: 5,
  },

  button: {
    marginBottom: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    height: 'auto !important',
    color: theme.palette.text.general,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  fieldNamesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'max-content',
    justifyContent: 'space-between',
    width: '100%',
  },

  fieldNamesWrapperWithCheckbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  setFavouriteBtn: {
    height: 30,
    width: 30,
    color: theme.palette.background.disabled,
    borderRadius: 30,
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  setFavouriteBtnIsSelected: {
    color: '#ff9800',
  },

  fieldName: {
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    color: theme.palette.text.general,
  },

  selectedItemName: {
    width: '90%',
    color: theme.palette.primary.main,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  blackSelectedItem: {
    color: theme.palette.text.general,
  },

  submitWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '15px',
  },

  apply: {
    color: '#fff !important',
  },
}))
