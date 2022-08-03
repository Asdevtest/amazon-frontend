import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
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
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '28px',
  },
  noBoxesText: {
    color: 'rgba(61, 81, 112, 1)',
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

  orderNum: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#001029',
  },

  orderPrice: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#001029',
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
    color: '#001029',
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
    color: '#001029',
  },

  label: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#001029',
  },

  field: {
    margin: 0,
  },

  divider: {
    height: '660px',
  },
}))
