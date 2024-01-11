import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  currentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    [theme.breakpoints.down(1282)]: {
      padding: 20,
      flexDirection: 'row',
      width: '100%',
      minHeight: 200,

      justifyContent: 'space-between',
      gap: 'unset',
    },
  },

  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',

    [theme.breakpoints.down(1282)]: {
      width: 350,
      alignItems: 'flex-start',
      justifyContent: 'unset',
      gap: '5px',
    },
  },

  img: {
    marginRight: 20,
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  titleOfCurBox: {
    fontSize: '14px',
    lineHeight: '19px',
    width: 260,
    color: theme.palette.text.general,

    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
  },

  currentBoxInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    [theme.breakpoints.down(1282)]: {
      width: 200,
    },
  },

  qtyWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  qtyTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  qtySubTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  currentBoxesWrapper: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 10,
    minWidth: '350px',
    overflow: 'hidden',

    [theme.breakpoints.down(1282)]: {
      margin: 0,
      width: 'fit-content',
      minWidth: 'unset',
    },
  },

  categoryTitle: {
    fontWeight: 600,
    color: theme.palette.text.general,

    [theme.breakpoints.down(1282)]: {
      width: 'fit-content',
    },
  },

  footerTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,

    [theme.breakpoints.down(1282)]: {
      width: 'fit-content',
    },
  },

  arrowButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  arrowIcon: {
    color: theme.palette.primary.main,
  },

  arrowIconDisable: {
    color: theme.palette.text.second,
  },
}))
