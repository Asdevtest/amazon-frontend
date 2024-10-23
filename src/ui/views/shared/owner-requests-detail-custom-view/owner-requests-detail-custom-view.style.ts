import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  detailsWrapper: {
    marginTop: '20px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  chatWrapper: {
    width: '100%',
    height: '778px',
  },

  hideChatButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  additionalButtonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
