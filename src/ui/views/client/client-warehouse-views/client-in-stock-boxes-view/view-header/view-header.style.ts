import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  viewHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
  },
}))
