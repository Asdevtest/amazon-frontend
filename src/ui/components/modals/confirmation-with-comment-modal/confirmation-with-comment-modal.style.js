import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '586px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '30px',
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
    height: '141px',
    width: '100%',

    padding: 0,
    border: 'none',
  },

  buttonOk: {
    padding: '8px 36px',
  },

  buttonCancel: {
    padding: '8px 36px',
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.general,
    '&:hover': {
      backgroundColor: 'rgba(231, 231, 231, 0.801)',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  '@media (max-width: 768px)': {
    modalMessageWrapper: {
      width: '280px',
      minHeight: '168px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '30px',
    },
  },
}))
