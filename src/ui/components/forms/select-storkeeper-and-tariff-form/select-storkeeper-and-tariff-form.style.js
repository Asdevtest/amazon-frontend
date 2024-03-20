import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '80vw',
    height: '80vh',
    overflow: 'auto',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },

  boxesFiltersWrapper: {
    display: 'flex',
  },

  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
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
  },

  resetBtn: {
    color: theme.palette.text.general,
  },

  tableWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'auto',
  },

  attentionRow: {
    boxShadow: `inset 0 0 30px ${theme.palette.primary.main}`,
  },

  clearBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'fit-content',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  tabPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1',
    gap: '10px',
    overflow: 'auto',
  },
}))
