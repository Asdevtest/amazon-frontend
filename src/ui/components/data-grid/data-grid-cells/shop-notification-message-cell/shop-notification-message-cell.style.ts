import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const colorPrimary = theme.palette.primary.main

  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },

    multilineText: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
    },

    shopLink: {
      color: colorPrimary,
    },

    success: {
      color: theme.palette.text.green,
    },

    error: {
      color: theme.palette.text.red,
    },

    tooltipIcon: {
      color: colorPrimary,
      width: '14px !important',
      height: '14px !important',
    },

    tooltip: {
      fontSize: '14px',
      color: colorPrimary,
      backgroundColor: theme.palette.background.paper,
    },
  }
})
