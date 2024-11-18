import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  content: {
    position: 'relative',
    padding: '5px',
    width: '100%',
    height: '100%',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '10px',
    overflowY: 'auto',
  },

  emptyProducts: {
    gridTemplateColumns: '1fr',
    alignContent: 'center',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
