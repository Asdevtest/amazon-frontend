import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  modalWrapper: {
    padding: 10,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
    marginBottom: 30,
  },

  mainTitle: {
    width: 528,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  textMedium: {
    fontSize: 16,
    lineHeight: '22px',
  },

  bold: {
    width: 80,
    fontWeight: 600,
  },

  main: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 48,
  },

  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 30,
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

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  button: {
    padding: '0 75px',
  },

  capitalize: {
    textTransform: 'capitalize',
  },
}))
