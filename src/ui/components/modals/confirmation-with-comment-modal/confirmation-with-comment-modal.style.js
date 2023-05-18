import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '586px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '30px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      minHeight: '168px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '30px',
    },
  },

  modalMessageTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  buttonOk: {
    padding: '8px 36px',
  },

  buttonCancel: {
    padding: '8px 36px',
    color: theme.palette.text.general,
    textTransform: 'none',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
