import {makeStyles} from 'tss-react/mui'

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
    justifyContent: 'space-between',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '40px',
    marginRight: '20px',
  },

  goBackBtn: {
    margin: '16px 32px',
  },

  cancelBtn: {
    height: '36px',
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

  batchWrapper: {
    display: 'flex',
    marginLeft: '215px',
    alignItems: 'center',
  },

  batchPrice: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  batchPriceWrapper: {
    display: 'flex',
    width: '190px',
    justifyContent: 'space-between',
    marginLeft: '120px',
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
    height: '660px',

    // borderColor: theme.palette.background.border,
  },
}))
