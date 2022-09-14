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
  },

  buttonOk: {
    padding: '8px 36px',
    marginRight: '10px',
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
    alignSelf: 'flex-end',
  },
}))
