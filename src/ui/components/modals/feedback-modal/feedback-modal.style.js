import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
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
    color: '#001029',
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: '#656565',
  },

  heightFieldAuto: {
    height: '141px',
    width: '100%',
    paddingBottom: '30px',
  },

  buttonOk: {
    padding: '8px 36px',
  },

  buttonCancel: {
    padding: '8px 36px',
    backgroundColor: '#fff',
    color: '#001029',
    '&:hover': {
      backgroundColor: 'rgba(231, 231, 231, 0.801)',
    },
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
