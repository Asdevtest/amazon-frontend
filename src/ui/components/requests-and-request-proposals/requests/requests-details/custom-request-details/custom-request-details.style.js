import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: 60,
  },

  accordion: {
    width: '100%',
    borderRadius: '16px !important',
    boxShadow: theme.palette.boxShadow.paper,
    marginBottom: 20,

    '&::before': {
      opacity: 0,
    },
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
