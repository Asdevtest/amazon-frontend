import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  root: {
    width: '100%',
  },

  container: {
    width: '100%',
    padding: '20px',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: '16px',
  },

  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  alignCenter: {
    alignItems: 'center',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  mediaBlock: {
    width: '45%',
  },

  commentsBlock: {
    width: '55%',
  },

  commentsGrid: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyContent: 'space-between',
    gap: '15px',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  externalLinkButton: {
    marginRight: 'auto',
  },
}))
