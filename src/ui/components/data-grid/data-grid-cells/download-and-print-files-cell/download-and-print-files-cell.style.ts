import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontWeight: 600,
  },

  file: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
