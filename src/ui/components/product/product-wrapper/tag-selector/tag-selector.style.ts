import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
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
}))
