import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },

  clickedRow: {
    cursor: 'pointer',

    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
    },
  },

  curSelectedSupplier: {
    boxShadow: 'inset 0 0 30px rgba(0, 123, 255, 1)',
  },

  table: {
    padding: 1,
    width: '100%',
    maxHeight: 'calc(151px * 5)',
    overflow: 'auto',
    outline: '1px solid rgb(224, 224, 224)',

    '& td': {
      flexShrink: 0,
      borderBottom: 'none',
    },
    '& th': {
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },

  tableCellPadding: {
    padding: '16px 24px',
  },

  alignCenter: {
    position: 'relative',
    textAlign: 'center',
    minWidth: 100,
  },
  alignRight: {
    textAlign: 'right',
  },

  tableRowAcceptedSupplier: {
    backgroundColor: theme.palette.background.tableCurRow,
  },

  textCell: {
    width: '254px',
    maxHeight: '100px',
    overflowY: 'auto',
    textAlign: 'center',
  },

  nameCell: {
    minWidth: '164px',
    maxHeight: '100px',
    textAlign: 'center',
    overflowY: 'auto',
  },

  priceCell: {
    minWidth: '55px',
    textAlign: 'center',
  },

  amountCell: {
    minWidth: '115px',
    textAlign: 'center',
  },

  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '209px',
  },

  link: {
    fontSize: 12,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  name: {
    width: '300px',
  },
  normDateCellTypo: {
    fontSize: '10px',
    fontWeight: '600',

    textAlign: 'center',
  },
  StatsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto',
    height: 'auto',
  },
  multiplicityWrapper: {
    display: 'flex',
    gap: 5,
    marginLeft: 5,
  },
  amountInBoxText: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '140%',
  },
  multiplicityText: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 12,
  },
  primary: {
    color: theme.palette.background.yellow,
  },

  priceVariationsCell: {
    minWidth: 130,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 'auto',
    color: theme.palette.text.general,
    fontSize: '12px',
  },
}))
