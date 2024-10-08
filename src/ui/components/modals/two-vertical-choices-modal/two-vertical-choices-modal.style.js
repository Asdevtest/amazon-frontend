import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  resultButtonsWrapper: {
    minHeight: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    gap: 10,
  },

  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '445px',
    minHeight: '168px',
  },

  title: {
    color: theme.palette.text.general,
  },

  bottomBtnText: {
    color: `${theme.palette.text.general} !important`,
  },

  '@media (max-width: 768px)': {
    resultButtonsWrapper: {
      width: '280px',
    },
    modalMessageWrapper: {
      width: '280px',
    },
    button: {
      width: '191px',
      height: '40px',
    },
  },
}))
