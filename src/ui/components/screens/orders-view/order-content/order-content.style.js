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
    // marginTop: '40px',
    marginRight: '20px',
  },

  goBackBtn: {
    margin: '16px 32px',
  },

  btnsSubWrapper: {
    display: 'flex',
    width: 300,
    justifyContent: 'space-between',
  },

  button: {
    height: 40,
    padding: '0 40px',
  },

  cancelBtn: {
    height: '36px',
    color: theme.palette.text.general,
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
    height: '720px',

    // borderColor: theme.palette.background.border,
  },
  sharpCell: {
    textAlign: 'center',
  },
  asinCell: {
    padding: '12px 0px',
    height: '88px',
    scope: 'row',
    position: 'relative',
    width: 185,
  },
  asinCellContainer: {
    display: 'inline-flex',
    width: '100%',
  },
  quantityCell: {
    textAlign: 'center',
  },
  csCodeTypoWrapper: {
    width: '100%',
  },
  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    // maxWidth: '100%',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  finalWeightCell: {
    textAlign: 'center',
  },
  grossWeightCell: {
    textAlign: 'center',
  },
  copyAsin: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
  },
  typoCell: {
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(189, 194, 209, 1)',
  },
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  typoSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },
  shortDateCellTypo: {
    textAlign: 'center',
    width: 65,
    whiteSpace: 'pre-line',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
  },
  multilineTextWrapper: {
    width: 70,
    whiteSpace: 'pre-wrap',
  },
  multilineText: {
    maxHeight: '100%',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.main,
  },
}))
