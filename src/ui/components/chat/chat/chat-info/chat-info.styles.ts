import { makeStyles } from 'tss-react/mui'

export const useChatInfoStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 350,
  },
  tabs: {
    minHeight: 'unset',

    '.MuiTabs-scroller': {
      width: 'fit-content',
      padding: '10px 8px 0',
    },

    '.MuiTabs-flexContainer': {
      width: 'fit-content',
      gap: '15px',
    },

    '& button': {
      // padding: '14px 10px',
      fontSize: '14px',
      fontWeight: 400,
      textTransform: 'none',
      padding: '0 0 5px 0',
      lineHeight: '1',
      minHeight: 'unset',
      whiteSpace: 'nowrap',
    },
  },

  tabBtn: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },
  imageList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 103px)',
    gridTemplateRows: 'auto 103px',
    width: '100%',
    gap: '5px',

    overflowY: 'auto',
    maxHeight: 485,

    img: {
      borderRadius: 4,
      cursor: 'pointer',
      width: '103px',
      height: '103px',
      objectFit: 'cover',
    },
  },

  noData: {
    textAlign: 'center',
  },

  files: {
    overflowY: 'auto',
    maxHeight: 425,
  },
}))
