import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  multilineTextHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: 'auto',
    },
    gap: 5,
  },

  multilineTextHeaderCenter: {
    justifyContent: 'center',
  },

  multilineTextHeaderSpaceBetween: {
    justifyContent: 'space-between',
  },

  multilineHeaderText: {
    width: 'fit-content',
    textAlign: 'center',
    color: theme.palette.text.general,
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },

  headerIcon: {
    width: '14px !important',
    height: '14px !important',
    color: 'gray',
    position: 'absolute',
    right: -15,
    top: 20,
    overflow: 'visible',
  },

  headerIconBlue: {
    color: theme.palette.primary.main,
  },
}))
