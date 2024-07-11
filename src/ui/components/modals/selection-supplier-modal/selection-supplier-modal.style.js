import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  comment: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',
  },

  commentContainer: {
    margin: 0,
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
