/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: '45px',
  },

  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  radioRoot: {
    '& > span > svg': {
      width: 20,
      height: 20,
      color: theme.palette.primary.main,
    },
  },
}))
