import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dialogClassName: {
    width: '1200px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerWrapperCenter: {
    display: 'flex',
    justifyContent: 'center',
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7, .3)',
  },

  dataGridWrapper: {
    height: '82vh',
    width: '100%',
  },

  loadingCircle: {
    zIndex: 50,
  },
}))
