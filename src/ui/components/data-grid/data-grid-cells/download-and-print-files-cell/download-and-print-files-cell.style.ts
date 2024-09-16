import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  title: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
  },

  file: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  button: {
    width: '130px',
  },
}))
