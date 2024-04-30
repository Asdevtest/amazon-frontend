import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 300,
    display: 'flex',
    gap: 20,
  },

  input: {
    height: 30,
    padding: '5px 10px',
    fontSize: 14,
    lineHeight: '19px',
  },

  inputClasses: {
    borderRadius: 7,
  },

  field: {
    margin: 0,
  },

  label: {
    marginBottom: 5,
  },

  trackNumber: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  trackNumberPhoto: {
    width: 115,
    height: 115,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: 16,
  },

  button: {
    height: 36,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}))
