import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  dataGridWrapper: {
    marginTop: 10,
    height: '78vh',
    width: '100%',
  },

  searchInput: {
    marginTop: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    width: 300,
    height: 36,
  },
}))
