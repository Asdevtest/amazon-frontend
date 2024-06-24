import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 485,
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

  сomments: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    maxHeight: 150,
    overflowY: 'auto',
  },

  text: {
    whiteSpace: 'pre-wrap',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
