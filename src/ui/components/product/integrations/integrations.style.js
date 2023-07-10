import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '76vh',
  },

  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    gap: 20,
    marginBottom: 10,
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
