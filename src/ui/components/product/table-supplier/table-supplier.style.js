import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    borderRadius: 10,
    border: '1px solid #E0E0E0',
    padding: 2,
  },

  table: {
    maxHeight: 370,
    overflow: 'auto',

    '& td': {
      height: 150,
      borderBottom: 'none',
    },

    '& th': {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: '140%',
      padding: '0 8px',
    },

    '&::-webkit-scrollbar-button': {
      borderRadius: 10,
    },

    '& > table > tbody': {
      height: 160,
    },
  },

  tableHead: {
    height: 50,
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: theme.palette.background.second,
  },

  tableRow: {
    maxHeight: 150,
  },

  tableRowAcceptedSupplier: {
    backgroundColor: theme.palette.background.tableCurRow,
  },

  tableRowSelectedSupplier: {
    backgroundColor: 'rgba(245, 0, 87, 0.08)',
  },

  mainText: {
    color: theme.palette.text.second,
    fontSize: 14,
  },

  nameCell: {
    position: 'relative',
    width: 150,
  },

  statsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  primary: {
    color: theme.palette.background.yellow,
  },

  multiplicityWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },

  multiplicityText: {
    color: theme.palette.text.second,
    fontSize: 12,
  },

  amountInBoxText: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 12,
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  link: {
    fontSize: 14,
    color: theme.palette.primary.main,
  },

  linkIcon: {
    transition: '0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  priceVariationsCell: {
    width: 160,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  commentCell: {
    width: 200,
  },

  commentWrapper: {
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    alignItems: 'center',
    height: '60px !important',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
  },

  tooltip: {
    maxWidth: '650px',
  },

  filesWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 300,

    '& > div': {
      margin: 0,
    },
  },
}))
