import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
    height: '100%',
    width: '100%',
  },

  tasksWrapper: {
    width: '100%',
    flex: 1,
    overflow: 'auto',
    padding: '3px',
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 450,
  },

  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },

  downloadIcon: {
    color: '#fff',
  },

  disabledDownloadIcon: {
    color: theme.palette.button.disabledText,
  },
}))
