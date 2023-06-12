import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  switcherWrapper: {
    display: 'flex',
    alignItems: 'center',
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
    color: '#fff',
    background: 'none',
    minWidth: '24px !important',
  },

  left: {
    borderRadius: '4px 0 0 4px',
  },

  right: {
    borderRadius: '0 4px 4px 0',
  },

  activeOption: {
    background: theme.palette.primary.main,
  },
}))
