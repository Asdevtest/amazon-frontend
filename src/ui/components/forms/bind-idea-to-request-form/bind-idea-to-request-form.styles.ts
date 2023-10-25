import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
  },

  tableWrapper: {
    height: '354px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
}))
