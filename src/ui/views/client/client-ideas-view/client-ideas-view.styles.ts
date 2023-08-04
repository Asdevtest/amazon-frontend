import { makeStyles } from 'tss-react/mui'

export const useClientIdeasViewStyles = makeStyles()(theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '320px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.general,
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
    marginTop: '20px',
    height: 'calc(100vh - 230px)',
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  createRequest: {
    display: 'flex',
    gap: '5px',

    svg: {
      width: 12,
    },
  },

  modalDialogContext: {
    padding: 0,
  },
}))
