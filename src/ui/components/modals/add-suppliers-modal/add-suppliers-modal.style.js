import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '700px',
  },
  modalTitle: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  linkWrapper: {
    display: 'flex',
    gap: '5px',

    '& > :nth-child(n)': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
    },
    '& > :first-child': {
      color: '#001029',
    },
    marginBottom: '30px',
  },

  idWrapper: {
    display: 'flex',
    gap: '15px',
    '& > :nth-child(n)': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
    },
    '& > :first-child': {
      color: '#656565',
    },
    alignItems: 'center',
    marginBottom: '30px',
  },

  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  copyWrapper: {
    display: 'flex',
    gap: '13px',
    alignItems: 'center',

    '& > :first-child': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
      color: '#001029',
    },
  },

  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
  },

  button: {
    width: '179px',
    height: '40px',
  },
  cancelButton: {
    color: '#001029',
  },
}))
