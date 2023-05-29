import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  switcherWrapper: {
    display: 'flex',
    padding: 2,

    borderRadius: 4,
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
    borderRadius: 4,
    color: theme.palette.text.general,
    background: 'none',
    minWidth: 'unset !important',

    '&:hover': {
      color: theme.palette.text.negativeMain,
    },
  },

  activeOption: {
    background: theme.palette.primary.main,
    color: theme.palette.text.negativeMain,
  },
}))
