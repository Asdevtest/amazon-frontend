import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  btnsWrapper: {
    display: 'flex',
    margin: '0 0 15px 0',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: '#fff',
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
  datagridWrapper: {
    marginTop: '10px',
    height: '85vh',
  },
}))
