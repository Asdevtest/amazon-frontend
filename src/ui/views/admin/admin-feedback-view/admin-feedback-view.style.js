import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  searchInput: {
    width: '290px',
    height: '40px',
    border: `1px solid ${theme.palette.primary.main}`,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  tableWrapper: {
    height: '82vh',
    width: '100%',
    marginTop: 20,
  },
}))
