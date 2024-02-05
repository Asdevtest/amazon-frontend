import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  buttonsSubWrapper: {
    marginRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  searchInput: {
    width: '330px',
  },

  actionButtonWithPlus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minWidth: '180px !important',
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
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
}))
