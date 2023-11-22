import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  smallRowImgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    height: '58px',
    width: '58px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '4px',
    border: `1px solid #E0E0E0`,
  },

  preloaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
  },

  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(0, 0, 0, 0.5)',
  },

  preloaderIcon: {
    width: '18px !important',
    height: '18px !important',
    color: '#fff',
  },
}))
