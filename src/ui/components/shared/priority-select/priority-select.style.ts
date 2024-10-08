import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  nativeSelect: {
    borderRadius: '100px',
    width: 150,
    '& > div': {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
  },

  colorYellow: {
    color: '#F3AF00 !important',
    WebkitTextFillColor: 'inherit !important',
  },

  colorRed: {
    color: '#FF1616 !important',
    WebkitTextFillColor: 'inherit !important',
  },

  colorGreen: {
    color: '#00B746 !important',
    WebkitTextFillColor: 'inherit !important',
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
