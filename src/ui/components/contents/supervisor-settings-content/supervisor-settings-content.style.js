import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonWrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },

  dataGridWrapper: {
    marginTop: '20px',
    height: '74vh',
    width: '100%',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '30px',
  },
}))
