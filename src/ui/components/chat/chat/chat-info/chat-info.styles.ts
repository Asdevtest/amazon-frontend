import { makeStyles } from 'tss-react/mui'

export const useChatInfoStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    height: '100%',
    minWidth: 366,

    [theme.breakpoints.down(768)]: {
      minWidth: 280,
    },
  },
  tabs: {
    height: 34,
    minHeight: 34,

    [theme.breakpoints.down(768)]: {
      height: 29,
      minHeight: 29,
    },
  },

  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },

  tabPanel: {
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: '0 10px',
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

    [theme.breakpoints.down(768)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',

      img: {
        height: 80,
      },
    },
  },

  noData: {
    textAlign: 'center',
  },
}))
