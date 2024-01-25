/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 58,
  },

  icon: {
    width: '21px !important',
    height: '21px !important',
    color: theme.palette.text.second,
    cursor: 'pointer',
  },

  activeViewMode: {
    color: theme.palette.primary.main,
  },
}))
