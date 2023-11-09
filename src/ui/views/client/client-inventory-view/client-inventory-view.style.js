import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '330px',
    height: 36,
  },

  btnsWrapper: {
    marginRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  openArchiveBtn: {
    width: 230,
    color: theme.palette.primary.main,
  },

  actionButtonWithPlus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minWidth: '180px !important',
  },

  icon: {
    width: 16,
    height: 16,
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

  datagridWrapper: {
    marginTop: '20px',
    height: '75vh',
    width: '100%',
  },

  clickableCell: {
    transition: '.3s ease',

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
      transform: 'scale(0.98)',
    },
  },

  ideaRowGreen: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldGreen,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  ideaRowYellow: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldYellow,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  modalDialogContext: {
    padding: 0,
  },
}))
