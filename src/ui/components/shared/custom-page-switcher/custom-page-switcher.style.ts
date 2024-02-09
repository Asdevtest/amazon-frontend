import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: 15,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 400,
    margin: '0 !important',
  },

  fieldContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    margin: '0 !important',
  },

  selectStyles: {
    height: '100%',
    padding: '3px 32px 3px 10px !important',
  },

  rootInput: {
    width: 70,
    height: 30,
  },

  switcherText: {
    fontSize: 16,
    fontWeight: 400,
    whiteSpace: 'nowrap',
  },

  switcherControlWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  navigation: {
    cursor: 'pointer',
    width: '20px !important',
    height: '20px !important',
  },

  disabledNavigation: {
    cursor: 'unset',
    color: theme.palette.text.gray,
  },
}))
