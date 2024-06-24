import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  mainWrapper: {
    display: 'flex',
    padding: '0 16px 16px',
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
    lineHeight: '21px',
    color: theme.palette.text.general,
  },

  details: {
    padding: 0,
  },

  filesWrapper: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  editorWrapper: {
    marginTop: 0,
  },

  textEditor: {
    height: 158,
  },
}))
