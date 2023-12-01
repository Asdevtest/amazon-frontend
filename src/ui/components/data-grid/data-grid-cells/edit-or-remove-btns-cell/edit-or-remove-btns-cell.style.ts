import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  editOrRemoveBtnsCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  rowCancelBtn: {
    height: 30,
    padding: '0 25px',
    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },

  addPermissionBtn: {
    padding: '0 15px',
  },
}))
