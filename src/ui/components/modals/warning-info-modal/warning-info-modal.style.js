import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    width: '445px',
    minHeight: '168px',
  },
  title: {
    textAlign: 'center',
    width: '350px',
  },

  titleWarning: {
    color: 'red',
  },

  button: {
    width: '118px',
    fontSize: '18px',
  },
  '@media (max-width: 768px)': {
    modalMessageWrapper: {
      width: '260px',
      minHeight: '120px',
      gap: '20px',
    },
    title: {
      textAlign: 'center',
      width: '280px',
      fontSize: '14px',
    },
  },
}))
