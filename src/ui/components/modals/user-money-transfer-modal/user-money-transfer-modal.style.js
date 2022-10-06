import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    marginLeft: '10px',
  },
  link: {
    width: '300px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },

  title: {
    fontSize: '24px',
  },

  button: {
    width: '121px',
    height: '40px',
  },
}))
