import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  deleteButton: {
    width: 215,
  },

  searchInput: {
    width: 290,
    height: 40,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  saveButton: {
    width: 140,
  },

  datagridWrapper: {
    width: '100%',
    height: '71vh',
    borderRadius: 4,
    boxShadow: theme.palette.boxShadow.paper,
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

  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
  },
  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },
}))
