import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  productsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  productsList: {
    position: 'relative',
    display: 'flex',
    gap: '10px',
    height: '140px',

    overflowX: 'auto',
  },

  startIconButton: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },

  startIcon: {
    color: '#FFC53D',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  addButton: {
    height: '100%',
    minWidth: '100px !important',
    width: '100px !important',
  },
}))
