import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: 400,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    'p, a': {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
