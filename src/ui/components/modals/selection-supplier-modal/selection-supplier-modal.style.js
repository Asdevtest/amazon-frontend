import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalWrapper: {
    width: '548px',
  },

  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '60px',
  },

  modalTitleChange: {
    marginBottom: '30px',
  },

  modalSubTitle: {
    fontSize: '18px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  modalTextArea: {
    width: '100%',
    height: '119px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'block',
  },

  modalButton: {
    width: '236px',
    height: '90px',
    fontSize: '18px',
    lineHeight: '22px',
    backgroundColor: '#c4c4c4',
    transition: 'all .5s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .5s ease-in-out',
    },
  },

  modalButtonActive: {
    backgroundColor: '#006CFF',
  },

  modalButtonsWrapper: {
    marginBottom: '60px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '74px',
  },

  modalButtonWrapper: {
    display: 'flex',
    justifyContent: 'right',
  },

  modalButtonBack: {
    width: '134px',
    height: '40px',
  },

  modalButtonNext: {
    width: '134px',
    height: '40px',
  },
}))
