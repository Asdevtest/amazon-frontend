import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  rootTabs: {
    minHeight: 0,
  },

  indicator: {
    height: 1,
  },

  flexContainerTabs: {
    gap: 25,
  },

  rootTab: {
    minHeight: 0,
    padding: '9px 15px',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'none',
    color: theme.palette.text.secondary,
  },

  contentWrapper: {
    width: 'max-content',
    padding: 40,
    borderRadius: 4,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  // common styles for orders and supplier search
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 20,

    '> div': {
      margin: 0,
    },
  },

  textField: {
    width: 430,
    height: 40,
    color: theme.palette.text.primary,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  label: {
    maxWidth: 430,
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}))
