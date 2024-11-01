import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: '10px',
  },

  supplierDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  field: {
    margin: 0,
  },

  input: {
    width: 'unset',
  },
}))
