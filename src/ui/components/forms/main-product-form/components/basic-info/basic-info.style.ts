import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  fullWidth: {
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
    gap: '20px',
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

  productInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  tabHeight: {
    height: '380px',
    overflowY: 'auto',
  },

  gridLayout: {
    display: 'grid',
    alignItems: 'end',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
  },

  productInfo: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },

  privatesColumns: {
    gridTemplateColumns: 'repeat(8, 1fr)',
  },

  divider: {
    margin: 0,
  },

  tariffText: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '3px',

    span: {
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },

  tabContent: {
    padding: '10px',
    background: theme.palette.background.general,
    borderRadius: '16px',
  },

  usersList: {
    height: 'calc(100% - 125px)',
  },
}))
