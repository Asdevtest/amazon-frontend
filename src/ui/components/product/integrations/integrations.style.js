import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '74vh',
  },

  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    padding: '10px',
  },

  buttonOffset: {
    marginLeft: 20,
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },

  footerCell: {
    padding: 0,
    margin: 0,
  },

  toolbarContainer: {
    height: '52px',
  },
}))
