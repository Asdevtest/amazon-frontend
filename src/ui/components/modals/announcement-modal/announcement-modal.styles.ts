import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '100%',
    height: '100%',
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

  generalflexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 80,
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
    fontWeight: 600,
  },

  rating: {
    fontSize: 9,
  },

  main: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 50,
  },

  files: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  content: {
    width: '100%',
  },
}))
