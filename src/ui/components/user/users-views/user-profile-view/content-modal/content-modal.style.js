import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  modalButton: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
    textTransform: 'none',
  },

  table: {
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  tableCell: {
    align: 'center',
  },
  divider: {
    margin: '0px -24px',
  },
  tableWrapper: {
    margin: '0px -24px',
    width: 'auto',
  },
  imgCell: {
    padding: '16px 24px',
  },
  buttonsWrapper: {
    textAlign: 'right',
    marginTop: '16px',
  },
  buyNowBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    marginRight: '8px',
  },
  cancelBtn: {
    backgroundColor: '#d5d5d5',
    color: theme.palette.text.general,
    textTransform: 'none',
  },
}))
