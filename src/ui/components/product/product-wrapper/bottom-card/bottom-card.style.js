import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',

    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },

  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },

  cardPadding: {
    padding: '16px',
    backgroundColor: theme.palette.background.second,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    // overflow: 'hidden',
    padding: 0,
  },

  infoInput: {
    width: '100%',
  },

  infoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  infoSubWrapper: {
    width: '48%',
  },

  infoContainer: {
    width: '100%',
    marginBottom: '30px',
    [theme.breakpoints.down(768)]: {
      marginBottom: '25px',
    },
  },
}))
