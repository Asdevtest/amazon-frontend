import { makeStyles } from 'tss-react/mui'

export const usePrioritySelectStyles = makeStyles()(theme => ({
  nativeSelect: {
    width: 150,
    '& > div': {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
  },

  colorYellow: {
    color: '#F3AF00 !important',
    '-webkit-text-fill-color': 'inherit !important',
  },

  colorRed: {
    color: '#FF1616 !important',
    '-webkit-text-fill-color': 'inherit !important',
  },

  colorGreen: {
    color: '#00B746 !important',
    '-webkit-text-fill-color': 'inherit !important',
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  rushOrderImg: {
    width: '12px',
    height: '13px',
  },
}))
