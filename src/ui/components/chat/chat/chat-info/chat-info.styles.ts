import { makeStyles } from 'tss-react/mui'

export const useChatInfoStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    minWidth: 366,

    [theme.breakpoints.down(768)]: {
      minWidth: 280,
    },
  },
  tabs: {
    height: 34,
    minHeight: 'unset',

    '.MuiTabs-scroller': {
      width: 'fit-content',
      padding: '10px 8px 0',

      [theme.breakpoints.down(768)]: {
        padding: '10px 3px 0',
      },
    },

    '.MuiTabs-flexContainer': {
      width: 'fit-content',
      gap: '15px',

      [theme.breakpoints.down(768)]: {
        gap: 10,
        marginBottom: 10,
      },
    },

    '& button': {
      fontSize: '14px',
      fontWeight: 400,
      textTransform: 'none',
      padding: 0,
      lineHeight: '1',
      minHeight: 'unset',
      whiteSpace: 'nowrap',
      minWidth: 75,
    },
  },

  tabBtn: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },
  imageList: {
    padding: '0 10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    width: '100%',
    gap: '5px',

    overflowY: 'auto',
    maxHeight: 470,

    img: {
      borderRadius: 4,
      cursor: 'pointer',
      width: '100%',
      height: '100px',
      objectFit: 'cover',
    },

    [theme.breakpoints.down(768)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      maxHeight: 335,

      '&::-webkit-scrollbar': {
        width: 0,
      },

      img: {
        height: '120px',
      },
    },
  },

  noData: {
    textAlign: 'center',
  },

  files: {
    padding: '0 10px',
    overflowY: 'auto',
    maxHeight: 470,

    [theme.breakpoints.down(768)]: {
      maxHeight: 335,

      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },
}))
