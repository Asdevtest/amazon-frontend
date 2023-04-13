/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    position: 'fixed',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 40,
    height: 40,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',

    borderRadius: '50%',
  },

  arrowIcon: {
    color: theme.palette.primary.main,
  },
}))
