import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  field: {
    margin: 0,
    width: 200,
    gap: 10,
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

  label: {
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.primary,
  },
}))
