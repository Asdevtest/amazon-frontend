import {makeStyles} from 'tss-react/mui'

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
  iconButton: {
    height: '40px',
    width: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    // color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.second,
    textAlign: 'center',
    marginBottom: 24,
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  alert: {
    marginBottom: '24px',
  },
  cardPadding: {
    padding: '16px',
    backgroundColor: theme.palette.background.second,
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  typoMarginRight: {
    marginRight: '16px',
  },
  checkbox: {
    padding: 0,
    color: 'rgba(0, 123, 255, 1)',
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
