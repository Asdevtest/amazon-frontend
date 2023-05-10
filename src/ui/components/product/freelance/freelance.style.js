import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    height: 'calc(100vh - 300px)',
    width: '100%',
  },

  taskTypeWrapper: {
    display: 'flex',
  },
  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '20px',
  },

  button: {
    padding: '0 15px',
    height: 40,
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,

    fontSize: 14,
    fontWeight: 600,

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

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
  },
}))
