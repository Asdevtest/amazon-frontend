import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    width: '485px',
    minHeight: '168px',
    padding: 20,
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '10px',
  },

  modalTitleChange: {
    marginBottom: '30px',
  },

  modalLabel: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },

  modalTextArea: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',
  },

  modalButton: {
    backgroundColor: '#c4c4c4',
    transition: 'all .5s ease-in-out',
  },

  modalButtonActive: {
    backgroundColor: `${theme.palette.primary.main}`,
  },

  modalButtonsWrapper: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  modalButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  modalButtonNextStepWrapper: {
    display: 'flex',
    justifyContent: 'right',
  },

  modalButtonBack: {
    width: '121px',
    height: '40px',
    backgroundColor: 'inherit',
    color: theme.palette.text.general,

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },

  btnsWrapper: {
    width: '100%',
  },

  searchSupplierForIdeaBtn: {
    width: 485,
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  divider: {
    margin: '30px 0',
  },

  subTitle: {
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: 20,
  },

  searchSupplierForIdeaButtonsWrapper: {
    width: '100%',
    display: 'flex',
  },
}))
