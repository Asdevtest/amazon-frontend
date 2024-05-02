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
      marginRight: 20,
    },
    '.MuiAutocomplete-option': {
      width: 280,
      padding: 5,
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderWidth: '0 !important',
    },
  },

  disableHover: {
    '&:hover': {
      'svg, button': {
        display: 'none',
      },
    },
  },

  addBtn: {
    position: 'absolute',
    right: 3,
    top: 7,
    bottom: 0,
  },

  tagList: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
}))
