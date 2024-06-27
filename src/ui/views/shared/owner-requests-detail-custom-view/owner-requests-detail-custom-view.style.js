import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  button: {
    marginRight: '10px',
  },

  detailsWrapper: {
    marginTop: '10px',
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
