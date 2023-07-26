import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '30px',
  },

  tableWrapper: {
    height: '354px',
  },
}))
