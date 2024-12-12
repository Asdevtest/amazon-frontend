import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  tableWrapper: {
    height: '300px',
  },
}))
