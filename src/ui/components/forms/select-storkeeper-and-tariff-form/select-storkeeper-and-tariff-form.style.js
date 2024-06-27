import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '80vw',
    height: '80vh',
    overflow: 'auto',
    padding: 10,
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
