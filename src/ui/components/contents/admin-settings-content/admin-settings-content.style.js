import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  rootTabs: {
    minHeight: 0,
    marginBottom: 20,
  },

  indicator: {
    height: 1,
  },

  flexContainerTabs: {
    gap: 25,
  },

  rootTab: {
    width: 206,
    minHeight: 0,
    padding: '0 15px 9px',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'none',
    color: theme.palette.text.second,
  },

  contentWrapper: {
    width: 'max-content',
    padding: 40,
    borderRadius: 4,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.dialog,
  },
}))
