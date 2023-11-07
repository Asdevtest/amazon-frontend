import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  selectedProductWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  productInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: '100%',

    gap: 5,
  },

  productImg: {
    height: 33,
    width: 33,
    objectFit: 'contain',
    objectPosition: 'center',
  },
}))
