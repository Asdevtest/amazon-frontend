import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  iconButtonWrapper: {
    display: 'none',

    [theme.breakpoints.down(480)]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))
