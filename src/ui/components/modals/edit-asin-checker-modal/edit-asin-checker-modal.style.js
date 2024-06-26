import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 400,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  fieldLabel: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  fieldInput: {
    height: '100%',
  },

  fieldContainer: {
    margin: 0,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
