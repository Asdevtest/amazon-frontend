import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  link: {
    padding: '10px 0',
    fontSize: '18px',
    display: 'flex',
  },

  icon: {
    padding: '4px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
  },
}))
