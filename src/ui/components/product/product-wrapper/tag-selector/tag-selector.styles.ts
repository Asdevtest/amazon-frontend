import {makeStyles} from 'tss-react/mui'

export const useTagSelectorStyles = makeStyles()(theme => ({
  body: {},
  search: {
    position: 'relative',
    '.MuiAutocomplete-input': {
      padding: '0 !important',
    },
    '.MuiInputLabel-root ': {
      lineHeight: '1 !important',
    },
    '.MuiAutocomplete-clearIndicator': {
      display: 'none',
    },
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
    backgroundColor: '#0164F4',
    borderRadius: '4px',

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
  },
  removeTeg: {
    cursor: 'pointer',
    color: theme.palette.text.second,
    fontSize: '12px',
    height: '12px',
    background: 'none',
    border: 'none',
    padding: 'unset',
  },
}))
