import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    height: '100%',
    width: '366px',

    [theme.breakpoints.down(768)]: {
      minWidth: 280,
    },
  },
  tabs: {
    height: 34,
    minHeight: 34,
  },

  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },

  tabPanel: {
    position: 'relative',
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: '0 10px',

    backgroundColor: theme.palette.background.general,
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
  },

  imageList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 5,

    img: {
      borderRadius: 4,
      cursor: 'pointer',
      width: '100%',
      height: '100px',
      objectFit: 'cover',
    },

    [theme.breakpoints.down(1024)]: {
      gridTemplateColumns: 'repeat(4, 1fr)',

      img: {
        height: 97,
      },
    },

    [theme.breakpoints.down(768)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',

      img: {
        height: 100,
      },
    },
  },

  noData: {
    textAlign: 'center',
  },

  videoWrapper: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    cursor: 'pointer',
    overflow: 'hidden',
  },

  spinnerContainer: {
    position: 'sticky',
    width: '30px',
    height: '30px',
    top: '10px',
    left: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
  },

  customSwitcherWrapper: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.background.general,
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
  },

  customSwitcher: {
    '.ant-radio-button-wrapper span:nth-of-type(2)': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  },
}))
