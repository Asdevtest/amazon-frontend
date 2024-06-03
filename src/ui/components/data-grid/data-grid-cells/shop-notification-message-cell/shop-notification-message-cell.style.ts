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
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '150px',
    },

    shopLink1: {
      display: 'flex',
      gap: '3px',
      alignItems: 'center',
      whiteSpace: 'nowrap',
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
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
      color: colorPrimary,
      backgroundColor: theme.palette.background.second,
      whiteSpace: 'pre-wrap',
    },
  }
})
