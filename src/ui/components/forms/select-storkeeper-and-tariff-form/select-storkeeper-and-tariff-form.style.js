import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '80vw',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },

  boxesFiltersWrapper: {
    display: 'flex',
    marginBottom: 10,
  },
  btnWrapperStyle: {
    width: 'fit-content',
  },

  button: {
    marginBottom: 5,
    marginRight: '10px',

    color: theme.palette.primary.main,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: theme.palette.other.tableActiveFilterBtn,

    color: `${theme.palette.primary.main} !important`,
  },

  selectedStorekeeperBtn: {
    boxShadow: `inset 0 0 15px ${theme.palette.primary.main}`,

    // color: theme.palette.text.general,
  },

  resetBtn: {
    color: theme.palette.text.general,
  },

  tableWrapper: {
    height: '50vh',
  },

  attentionRow: {
    boxShadow: `inset 0 0 30px ${theme.palette.primary.main}`,
  },

  clearBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 0 0',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
  },

  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
