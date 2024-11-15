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
    display: 'grid',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '10px',
    overflowY: 'auto',
  },

  empty: {
    alignContent: 'center',
    gridTemplateColumns: '1fr',
  },
}))
