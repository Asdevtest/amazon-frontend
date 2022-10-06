import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '80vw',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },

  button: {
    marginBottom: 5,
    marginRight: '10px',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },

  selectedStorekeeperBtn: {
    boxShadow: 'inset 0 0 15px #007BFF',
  },

  tableWrapper: {
    height: '50vh',
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px #007BFF',
  },

  clearBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 0 0',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
  },

  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
