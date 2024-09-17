import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: 60,
  },

  accordion: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: theme.palette.boxShadow.paper,
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
  },

  filesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  editorWrapper: {
    marginTop: 0,
  },
}))
