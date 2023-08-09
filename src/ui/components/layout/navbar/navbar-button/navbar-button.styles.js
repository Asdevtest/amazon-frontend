import { makeStyles } from 'tss-react/mui'

export const useNavbarButtonStyles = makeStyles()(theme => ({
  iconButtonWrapper: {
    display: 'none',

    [theme.breakpoints.down(1282)]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  },

  iconButtonWrapperLeft: {
    paddingLeft: 16,
    justifyContent: 'flex-start',
  },

  closeIcon: {
    width: 18,
    height: 18,
    color: theme.palette.primary.main,
  },
}))
