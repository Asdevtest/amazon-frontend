import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
    boxShadow: 'inset 0 -1px 0 0 #E6ECF0',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },
  // row: {
  //   width: '100%',
  //   padding: '0 0px',
  //   margin: '0 auto',
  // },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dataGridWrapper: {
    marginTop: '30px',
    height: '73vh',
  },
  row: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  rootDataGrid: {
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
  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },
  searchContainer: {
    width: 'auto',
    justifySelf: 'flex-start',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '30px',
  },
}))
