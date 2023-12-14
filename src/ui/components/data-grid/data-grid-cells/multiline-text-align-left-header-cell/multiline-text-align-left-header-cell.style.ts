import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  multilineTextAlignLeftHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },

  multilineTextAlignLeftHeader: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.general,
    height: '100%',
  },
}))
