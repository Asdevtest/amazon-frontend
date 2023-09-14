import { makeStyles } from 'tss-react/mui'

export const useTagSelectorStyles = makeStyles()(theme => ({
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

  option: {
    width: 280,
    fontSize: '14px',
    lineHeight: '19px',
    maxHeight: 57,
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  addBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: '10px',
    margin: 'auto',
    top: '0',
    bottom: '0',
    border: 'none',
    padding: 'unset',
    width: '18px',
    height: '18px',
    fontSize: '14px',
    color: '#FFF',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:disabled': {
      cursor: 'unset',
      opacity: '.65',
    },
  },
  tagList: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  tagListItem: {
    backgroundColor: theme.palette.background.chatMyMessage,
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    padding: '3.5px 15px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',

    p: {
      maxWidth: 170,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      margin: 'unset',
    },
  },
  removeTeg: {
    cursor: 'pointer',
    height: '100%',
    width: 20,
    marginRight: -10,
    background: 'none',
    border: 'none',
    padding: 'unset',

    div: {
      color: theme.palette.text.second,
      fontSize: '12px',
      height: '12px',
    },
  },
}))
