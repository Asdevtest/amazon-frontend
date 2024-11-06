import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '5px 5px 5px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '180px',
    overflowY: 'auto',
    gap: '6px',
  },

  box: {
    minWidth: '160px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '16px',
    padding: '0 5px',
  },
}))
