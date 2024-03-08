import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  modalWrapper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  mainTitle: {
    width: 400,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  flexRowContainer: {
    maxWidth: 215,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    width: '100%',
    fontSize: 14,
    lineHeight: '19px',
  },

  textMedium: {
    fontSize: 16,
    lineHeight: '22px',
  },

  bold: {
    fontWeight: 600,
  },

  main: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  description: {
    width: 580,
    height: 377,
    overflow: 'auto',
  },

  editorWrapper: {
    marginTop: 0,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
