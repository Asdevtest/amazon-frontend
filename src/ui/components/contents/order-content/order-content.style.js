import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '30px 50px 20px',
  },

  containerTitle: {
    fontSize: 18,
    lineHeight: '25px',
  },

  orderNumWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 400,
  },

  orderTitle: {
    color: theme.palette.text.general,
  },

  orderText: {
    marginLeft: 15,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  field: {
    marginBottom: '0 !important',
  },

  orderItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 100,
  },

  panelsWrapper: {
    display: 'flex',
    justifyContent: 'space-beetwen',
    gap: 45,
    padding: '30px 50px',
  },

  divider: {
    height: 720,
  },

  suppliersWrapper: {
    padding: '0 50px 30px',
  },

  supplierTitle: {
    marginBottom: 5,
    fontSize: 18,
    lineHeight: '25px',
  },

  supplierButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },

  supplierButtonText: {
    maxWidth: 98,
    fontSize: 12,
    lineHeight: '14px',
    color: theme.palette.text.second,
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 50px 30px',
  },

  button: {
    height: 40,
    padding: '0 40px',
  },

  cancelBtn: {
    height: 40,
    color: '#FFF',
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  tableWrapper: {
    padding: '0 50px 30px',
  },

  container: {
    marginBottom: 10,
  },

  tableText: {
    color: theme.palette.text.general,
  },

  noBoxesText: {
    color: theme.palette.text.general,
    fontSize: 14,
    lineHeight: '19px',
  },

  label: {
    fontSize: 16,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  iconBtn: {
    maxHeight: 40,
    maxWidth: 40,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,

    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
}))
