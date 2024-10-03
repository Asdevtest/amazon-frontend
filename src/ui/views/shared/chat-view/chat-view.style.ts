import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatViewWrapper: {
    flexDirection: 'row',
    gap: 'unset',
    containerType: 'inline-size',
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.casualBoxShadow,
    borderRadius: '20px',
    overflow: 'hidden',
  },

  messagesWrapper: {
    gap: 'unset',
    borderLeft: `1px solid ${theme.palette.background.second}`,
    overflow: 'hidden',
  },
}))
