import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tasksWrapper: {
    height: 'calc(100vh - 300px)',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '40px',
    marginBottom: '10px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 405,
    height: 36,
    fontSize: '16px',
    paddingLeft: '7px',
  },

  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },

  downloadIcon: {
    color: '#fff',
  },

  disabledDownloadIcon: {
    color: theme.palette.button.disabledText,
  },

  downloadBtn: {
    width: '250px',
  },
}))
