import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  redFlags: {
    padding: '5px 0',
    position: 'relative',
  },

  hiddenFlagsPopover: {
    maxHeight: '300px',
    maxWidth: '200px',
  },

  moreFlags: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    padding: '2px',
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.text.red,
    background: theme.palette.background.general,
    borderRadius: '4px',
  },
}))
