import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },

  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.second,
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
    marginBottom: 30,
  },

  infoSubWrapper: {
    width: '48%',
  },

  infoContainer: {
    width: '100%',
  },
}))
