import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const primary = theme.palette.primary.main

  return {
    buttonWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
    },

    pinIcon: {
      width: '18px !important',
      height: '18px !important',
    },

    unpinIcon: {
      color: primary,
    },

    pinArrowIcon: {
      width: '9px !important',
      height: '8px !important',
      color: primary,
    },

    rightDirection: {
      transform: 'rotate(180deg)',
    },
  }
})
