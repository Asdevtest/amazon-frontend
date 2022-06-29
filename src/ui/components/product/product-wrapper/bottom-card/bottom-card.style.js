import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    color: 'rgba(61, 81, 112, 1)',
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
    // color: 'rgba(61, 81, 112, 1)',

    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#656565',
    textAlign: 'center',
    marginBottom: 24,
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: 'rgba(61, 81, 112, 1)',
      borderBottom: 'none',
    },
    '& th': {
      color: 'rgba(61, 81, 112, 1)',
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
