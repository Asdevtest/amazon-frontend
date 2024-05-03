import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    height: 280,
    paddingRight: 5,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 14,
    lineHeight: '19px',
  },

  patchNote: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  title: {
    minHeight: 25,
    width: '90%',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  editorContainer: {
    margin: 0,
  },
}))
