import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '600px',
    display: 'flex',

    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      overflow: 'hidden',
    },
  },

  mainTitle: {
    marginBottom: '30px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  link: {
    width: '500px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },

  btnsWrapper: {
    display: 'flex',
    marginTop: '40px',
    justifyContent: 'flex-end',
    gap: '10px',
    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
    },
  },

  actionBtn: {
    width: '185px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '121px',
    },
  },

  textField: {
    width: '100%',
    height: '32px',
    color: theme.palette.text.general,
    // padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
  labelField: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
  },
}))
