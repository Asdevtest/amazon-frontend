import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 10,
  },

  saveButton: {
    width: 240,
  },

  datagridWrapper: {
    width: '100%',
    height: 650,
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.dialog,
  },

  footerContainer: {
    position: 'absolute',
    top: 20,
    right: 5,
    borderTop: 'none !important',
  },

  footerCell: {
    padding: 0,
    margin: 0,
  },

  toolbarContainer: {
    padding: '20px 20px 15px',
    height: 79,
  },
}))
