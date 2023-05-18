import { makeStyles } from 'tss-react/mui'

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
    height: 'auto',
    width: '100%',

    padding: '0 0 30px 0',
  },

  buttonOk: {
    padding: '8px 36px',
  },

  buttonCancel: {
    padding: '8px 36px',
    color: theme.palette.text.general,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,
  },
  commentWrapper: {
    position: 'relative',
  },

  inputIcon: {
    position: 'absolute',
    bottom: '24px',
    right: '10px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
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
