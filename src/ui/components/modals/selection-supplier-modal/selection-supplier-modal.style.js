import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '485px',
    minHeight: '168px',
  },

  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
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
    width: '220px',
    height: '90px',
    fontSize: '18px',
    lineHeight: '22px',
    backgroundColor: '#c4c4c4',
    transition: 'all .5s ease-in-out',

    '&:hover': {
      transform: 'scale(1.03)',
      transition: 'all .5s ease-in-out',
    },
  },

  modalButtonActive: {
    backgroundColor: '#006CFF',
  },

  modalButtonsWrapper: {
    marginBottom: '60px',
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
  modalButtonNext: {
    display: 'flex',
    width: '121px',
    height: '40px',

    backgroundColor: '#4caf50',
    color: 'ffffff',
    '&:hover': {
      backgroundColor: '#009a07',

      '@media (hover: none)': {
        backgroundColor: '#009a07',
      },
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
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: 20,
  },

  searchSupplierForIdeaButtonsWrapper: {
    width: '100%',
    display: 'flex',
  },
}))
