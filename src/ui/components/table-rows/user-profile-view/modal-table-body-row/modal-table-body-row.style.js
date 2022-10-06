// import {createStyles} from '@mui/material'

export const styles = {
  img: {
    height: '64px',
    width: '64px',
  },
  barcodeChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: 'rgb(0, 123, 255)',
    },
  },
  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  imgCell: {
    padding: '8px 24px',
    display: 'flex',
  },
  categoryCell: {
    align: 'center',
  },
  priceCell: {
    align: 'right',
  },
  countCell: {
    width: '72px',
  },
  avgPriceCell: {
    align: 'right',
  },
  costStart: {
    fontWeight: 600,
    color: '#273448',
  },
  select: {
    width: '160px',
  },
}
