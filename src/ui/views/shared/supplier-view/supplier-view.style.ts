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
    gap: '10px',
  },

  productsAll: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  },

  productsBig: {
    gridTemplateColumns: 'repeat(2, minmax(260px, 1fr))',
  },
}))
