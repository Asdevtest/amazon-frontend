import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  products: {
    '& > div': {
      '& > div': {
        padding: '5px',
        display: 'grid',
        gridAutoRows: 'min-content',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '10px',
      },
    },
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
