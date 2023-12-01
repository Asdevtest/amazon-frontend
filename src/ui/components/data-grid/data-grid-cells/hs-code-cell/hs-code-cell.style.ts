import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '7px',
    height: '30px',
    width: '100%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  barcodeChipNoExists: {
    backgroundColor: '#F5CF00',
    color: '#001029',

    '&:hover, &:focus': {
      color: '#fff',
    },
  },
}))
