import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    boxShadow: 'inset 0 -1px 0 0 #E6ECF0',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },

  buttonWrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  dataGridWrapper: {
    marginTop: '20px',
    height: '74vh',
  },
  row: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
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
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '30px',
  },
}))
