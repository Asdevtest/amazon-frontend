import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  modalWrapper: {
    minWidth: '100px',
    minHeight: '50px',
  },

  modalTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    maxWidth: '300px',
    overflow: 'auto',
  },

  modalNoTitle: {
    textAlign: 'center',
  },

  modalBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  copyImg: {
    marginLeft: '10px',
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
}))
