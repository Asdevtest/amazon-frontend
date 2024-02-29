import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  search: {
    position: 'relative',
    '.MuiAutocomplete-input': {
      padding: '0 !important',
      width: '100%',
    },
    '.MuiOutlinedInput-root': {
      paddingRight: '60px !important',
    },
    '.MuiInputLabel-root ': {
      lineHeight: '1 !important',
    },
    '.MuiAutocomplete-clearIndicator': {
      // display: 'none',
      marginRight: 20,
    },
    '.MuiAutocomplete-option': {
      width: 280,
      padding: 5,
    },
  },

  addBtn: {
    position: 'absolute',
    right: '3px',
    top: '7px',
    bottom: '0',
  },

  tagList: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },

  tagListItem: {
    maxWidth: 295,
    padding: '5px 5px 5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    background: theme.palette.background.chatMyMessage,
    borderRadius: 5,
  },

  removeTeg: {
    cursor: 'pointer',
    height: 16,
    width: 16,
  },

  tagWrapper: {
    display: 'flex',
  },

  textTag: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  widthLimitation: {
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
}))
