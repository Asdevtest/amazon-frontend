import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    minWidth: '500px',
    flexDirection: 'column',
  },

  link: {
    width: '500px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },

  textField: {
    width: '100%',
    minHeight: '60px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
}))
