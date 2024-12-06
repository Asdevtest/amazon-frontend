import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },

  title: {
    fontSize: '14px',
  },
}))
