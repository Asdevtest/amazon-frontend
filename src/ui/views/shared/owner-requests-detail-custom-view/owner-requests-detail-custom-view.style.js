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

  hideChatButton: {
    width: '250px',
    height: '52px',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    marginTop: '10px',
  },

  additionalButtonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
