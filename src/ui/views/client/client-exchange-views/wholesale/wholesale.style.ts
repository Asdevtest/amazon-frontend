import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
  },

  content: {
    height: '100%',
    padding: '5px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    overflowY: 'auto',
  },

  products: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  },

  empty: {
    alignContent: 'center',
  },

  emptyProducts: {
    gridTemplateColumns: '1fr',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
