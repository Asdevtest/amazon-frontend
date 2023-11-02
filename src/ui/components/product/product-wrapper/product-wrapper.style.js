import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  rootTabs: {
    minHeight: 0,
  },

  indicator: {
    height: 1,
  },

  flexContainerTabs: {
    gap: 20,
  },

  rootTab: {
    minHeight: 0,
    padding: '9px 15px',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'none',
    color: theme.palette.text.second,
  },
}))
