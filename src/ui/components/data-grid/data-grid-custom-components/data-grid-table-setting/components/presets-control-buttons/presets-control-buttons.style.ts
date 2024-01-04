import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  additionalButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },

  buttonWrapper: {
    width: 'calc(50% - 5px)',
  },

  additionalButton: {
    width: '100%',
  },
}))
