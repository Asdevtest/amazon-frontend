import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  modalSubTitle: {
    color: theme.palette.text.general,
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: '15px',
    marginBottom: '8px',
  },
  modalText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  inputWrapper: {
    marginBottom: '16px',
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginBottom: '8px',
  },
  modalButton: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
    textTransform: 'none',
  },
  footerTitle: {
    color: 'rgba(189, 194, 209, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    flexGrow: 1,
  },
  imgBox: {
    backgroundColor: 'rgba(196, 196, 196, 1)',
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
  },
  imgCross: {
    color: '#fff',
    fontSize: '68px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -59%)',
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
