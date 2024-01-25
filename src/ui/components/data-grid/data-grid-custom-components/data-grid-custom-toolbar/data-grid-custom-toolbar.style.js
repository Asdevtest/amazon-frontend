import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  toolbar: {
    padding: '5px 5px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  fullWidth: {
    width: '100%',
    justifyContent: 'space-between',
  },

  text: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },
}))
