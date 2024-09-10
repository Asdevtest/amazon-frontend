import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    gap: 5,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    height: '79vh',
  },

  modalWrapper: {
    height: 650,
  },
}))
