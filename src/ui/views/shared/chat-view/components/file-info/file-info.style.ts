import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  fileName: {
    fontWeight: 600,
    fontSize: '14px',
  },

  fileSize: {
    fontSize: '12px',
    color: theme.palette.text.second,
  },
}))
