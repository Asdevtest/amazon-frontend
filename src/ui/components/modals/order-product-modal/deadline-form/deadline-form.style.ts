import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  content: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
  },

  deadline: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  button: {
    width: 'max-content',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))