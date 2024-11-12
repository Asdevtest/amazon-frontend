import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  content: {
    height: '100%',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',

    '& > div': {
      height: '100%',
      alignContent: 'center',
    },
  },
}))
