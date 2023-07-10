import { makeStyles } from 'tss-react/mui'

export const useChatInfoStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 350,
  },
  tabs: {
    '& button': {
      // padding: '14px 10px',
      fontSize: '14px',
      fontWeight: 400,
    },
  },
  tabBtn: {
    backgroundColor: theme.palette.primary.main,
  },
  imageList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 103px)',
    gridTemplateRows: 'auto 103px',
    width: '100%',
    gap: '5px',

    overflowY: 'auto',
    maxHeight: 425,

    img: {
      width: '100%',
      height: '100%',
      maxWidth: '103px',
      maxHeight: '103px',
      objectFit: 'contain',
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
