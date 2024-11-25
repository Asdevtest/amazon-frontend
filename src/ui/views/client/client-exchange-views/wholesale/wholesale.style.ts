import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
  },

  suppliers: {
    padding: '5px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },

  products: {
    padding: '5px',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '10px',
  },
}))
