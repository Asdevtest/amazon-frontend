import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  button: {
    padding: '0 45px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,
    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  isDraftRow: {
    opacity: '.5',
  },

  tableWrapper: {
    marginTop: 20,
    height: '66vh',
  },

  boxesFiltersWrapper: {
    marginBottom: '15px',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  virtualScrollerContent: {
    maxHeight: '69vh',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
}))
