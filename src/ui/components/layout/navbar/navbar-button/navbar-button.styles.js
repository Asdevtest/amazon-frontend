import { makeStyles } from 'tss-react/mui'

export const useNavbarButtonStyles = makeStyles()(theme => ({
  iconButtonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  iconButtonWrapperLeft: {
    paddingLeft: '7%',
    justifyContent: 'flex-start',
  },

  closeIcon: {
    width: 18,
    height: 18,
    color: theme.palette.primary.main,
  },
}))
