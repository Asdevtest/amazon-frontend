import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  changeChipCellLabel: {
    fontSize: '12px',
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '7px',
    height: '30px',
    width: '100%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  barcodeChipOutTable: {
    height: '40px',
  },

  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },

  chipStock: {
    width: '100%',
    minWidth: '125px',
    backgroundcolor: theme.palette.text.general,
  },

  barcodeChipNoExists: {
    backgroundColor: '#F5CF00',
    color: '#001029',

    '&:hover, &:focus': {
      color: '#fff',
    },
  },
}))
