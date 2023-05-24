import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  orderContainer: {
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
  },
  containerTitle: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },
  panelsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
  tableWrapper: {
    padding: '16px',
  },
  container: {
    marginBottom: '24px',
  },
  tableText: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '28px',
  },
  noBoxesText: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '22px',
    marginBottom: '24px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: '0 20px',

    width: '100%',
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  button: {
    height: 40,
    padding: '0 40px',
  },

  cancelBtn: {
    height: 40,
    color: '#FFF',
  },

  orderNumWrapper: {
    display: 'flex',
    marginLeft: '171px',
    alignItems: 'center',
  },

  orderItemWrapper: {
    display: 'flex',
    marginLeft: '69px',
    alignItems: 'center',
  },

  orderNum: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  orderPrice: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  orderPriceWrapper: {
    display: 'flex',
    marginLeft: '69px',
    alignItems: 'center',
  },

  titleSpan: {
    marginLeft: 28,
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  label: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  field: {
    marginBottom: '0 !important',
  },

  divider: {
    height: '720px',
  },

  supplierActionsWrapper: {
    display: 'flex',
  },
  supplierContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '16px',
  },
  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  supplierButtonText: {
    maxWidth: '98px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    // color: theme.palette.text.second,

    color: theme.palette.text.second,
  },
  suppliersWrapper: {
    padding: '0 20px',
  },
}))
