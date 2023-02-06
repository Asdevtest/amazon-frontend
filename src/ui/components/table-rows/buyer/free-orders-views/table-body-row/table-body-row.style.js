import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  count: {
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(189, 194, 209, 1)',
  },
  text: {
    fontSize: '0.85rem',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
  },
  orderImg: {
    height: '64px',
    width: '64px',
    marginRight: '12px',
  },
  orderTitle: {
    fontWeight: 500,
    fontSize: '0.85rem',
  },
  orderText: {
    fontSize: '14px',
  },
  orderChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  orderChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  tooltip: {
    fontSize: '13px',
    margin: '0px',
  },
  statusCell: {
    padding: '8px',
    textAlign: 'center',
  },
  orderCell: {
    padding: '8px',
  },
  qtyBox: {
    display: 'flex',
  },
  qtyTypo: {
    marginLeft: '8px',
  },
  chipCell: {
    padding: '7px',
  },
  cellPadding: {
    padding: '7px',
  },
  centerCell: {
    textAlign: 'center',
  },
}))
