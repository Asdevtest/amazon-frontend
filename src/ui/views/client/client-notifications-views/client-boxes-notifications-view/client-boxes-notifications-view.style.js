import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: '15px',

    '> button': {
      width: 'fit-content',
    },
  },

  tableWrapper: {
    height: '86vh',
    width: '100%',
  },
}))
