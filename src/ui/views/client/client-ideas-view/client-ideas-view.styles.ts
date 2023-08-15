import { makeStyles } from 'tss-react/mui'

export const useClientIdeasViewStyles = makeStyles()(theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '320px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  root: {
    boxShadow: theme.palette.boxShadow.paper,
    backgroundColor: theme.palette.background.general,
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },

  footerCell: {
    padding: 0,
    margin: 0,
  },

  toolbarContainer: {
    height: '52px',
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '78vh',
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  createRequest: {
    display: 'flex',
    gap: '5px',

    svg: {
      width: 12,
    },
  },

  modalDialogContext: {
    padding: 0,
  },

  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,

      width: 5,
      height: '98%',
    },
  },

  yellowBorder: {
    background: theme.palette.background.yellowRow,

    ':hover': {
      background: theme.palette.background.yellowRow,
    },

    ':after': {
      background: '#C69109',
    },
  },

  redBorder: {
    background: theme.palette.background.redRow,

    ':hover': {
      background: theme.palette.background.redRow,
    },

    ':after': {
      background: theme.palette.other.rejected,
    },
  },
}))
