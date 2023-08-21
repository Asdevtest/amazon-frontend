import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '404px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    padding: '40px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
  },

  interconnectedProductsBodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '205px',
    overflowY: 'auto',
    paddingRight: '10px',
  },
}))
