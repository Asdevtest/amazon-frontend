import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  switcherWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 7,
    backgroundColor: theme.palette.input.customDisabled,
    height: 28,
  },

  switcherOption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    padding: '0 4px',
    height: 24,
    color: theme.palette.text.general,
    background: 'none',
    minWidth: '24px !important',
    transition: 'background .5s ease',

    '&:hover': {
      color: theme.palette.text.general,
      background: 'none',
    },
  },

  activeOption: {
    background: theme.palette.primary.main,
    '&:hover': {
      color: '#fff',
      background: theme.palette.primary.main,
    },
    color: '#fff',
    cursor: 'unset',
  },

  bigSwitcherWrapper: {
    height: '40px',
  },

  bigSwitcherOption: {
    padding: '0 15px',
    height: '100%',
  },

  btnWrapperStyle: {
    height: '100%',
  },
}))
