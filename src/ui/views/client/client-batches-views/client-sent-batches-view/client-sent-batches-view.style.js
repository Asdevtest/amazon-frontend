import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  datagridWrapper: {
    marginTop: '20px',
    height: '73vh',
    width: '100%',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  openArchiveBtn: {
    width: 230,
    color: theme.palette.primary.main,
  },

  archiveAddBtn: {
    width: 230,
    display: 'flex',
    gap: 10,
    border: `1px solid ${theme.palette.other.rejected}`,
    color: theme.palette.other.rejected,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      border: `1px solid ${theme.palette.other.rejected}`,
      opacity: 0.6,
    },

    '&:disabled': {
      borderColor: '#FEB9B9',
      color: '#FEB9B9',
    },

    '&.Mui-disabled': {
      background: 'none',
    },
  },

  boxesFiltersWrapper: {
    marginTop: 20,
    display: 'flex',
  },
}))
