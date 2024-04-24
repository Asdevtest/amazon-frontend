import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  fileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  file: {
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    cursor: 'pointer',
  },

  newFile: {
    border: `2px dashed ${theme.palette.primary.main}`,
  },
}))
