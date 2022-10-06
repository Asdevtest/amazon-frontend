import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  buttonWrapper: {
    padding: '16px',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '100%',
  },
  buttonsWrapper: {
    '& button': {
      marginRight: theme.spacing(2),
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },

  redRow: {
    color: 'red',
  },

  greenRow: {
    color: 'green',
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: '#fff',

    backgroundColor: theme.palette.background.main,
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

  '@media (max-width: 768px)': {
    toolbarContainer: {
      visibility: 'hidden',
    },
  },
}))
