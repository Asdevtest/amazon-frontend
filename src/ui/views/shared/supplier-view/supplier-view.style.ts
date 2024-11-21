import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  productsWrapper: {
    position: 'relative',
    height: '100%',
  },

  products: {
    padding: '5px',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '10px',
  },
}))
