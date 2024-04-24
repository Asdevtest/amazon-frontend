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
    flex: '1',
    width: '100%',
  },
}))
