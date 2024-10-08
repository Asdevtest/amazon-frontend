import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 320,
    height: '100%',
    overflow: 'auto',
    borderRadius: '7px 0 0 7px',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRight: `2px solid ${theme.palette.background.chatIncomeMessage}`,

    [theme.breakpoints.down(1024)]: {
      width: 220,
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
      borderRadius: 7,
      borderRight: 'none',
    },
  },

  chatWrapper: {
    background: theme.palette.background.general,
  },

  activeChat: {
    background: theme.palette.background.activeChat,
  },

  indicator: {
    backgroundColor: theme.palette.primary.main,
  },

  row: {
    width: '100%',
    padding: 0,
    margin: '0 auto',
    minHeight: `40px`,
  },

  selected: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
  },

  tabRoot: {
    textTransform: 'none',
    minHeight: `40px`,
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },
}))
