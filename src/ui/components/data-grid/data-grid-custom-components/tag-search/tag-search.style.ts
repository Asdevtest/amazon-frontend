import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '222px',
  },

  searchInput: {
    width: '100%',
    height: '30px',
    border: `1px solid ${theme.palette.input.customBorder}`,
  },
}))
