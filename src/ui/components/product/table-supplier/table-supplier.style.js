import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },

  table: {
    borderRadius: 10,
    border: '1px solid rgb(224, 224, 224)',
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
  },

  tableHead: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: theme.palette.background.second,
  },

  tableBody: {
    maxHeight: 450,
    overflowY: 'scroll',
    position: 'relative',
  },

  tableCellPadding: {
    padding: '16px 24px',
  },

  alignCenter: {
    textAlign: 'center',
  },

  alignCenterFiles: {
    textAlign: 'center',
    zIndex: 1,
  },

  tableRowAcceptedSupplier: {
    backgroundColor: theme.palette.background.tableCurRow,
  },
  tableRowSelectedSupplier: {
    backgroundColor: 'rgba(245, 0, 87, 0.08)',
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'min-content',
  },

  link: {
    fontSize: 12,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  nameCell: {
    position: 'relative',
    minWidth: 200,
  },

  commentCell: {
    minWidth: 250,
  },

  priceVariationsCell: {
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 'auto',
  },

  filesWrapper: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  createdByCell: {
    width: '120px',
    textAlign: 'center',
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
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
  multiplicityWrapper: {
    display: 'flex',
    gap: 5,
    marginLeft: 5,
  },
  multiplicityText: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 12,
  },
  amountInBoxText: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '140%',
  },
  primary: {
    color: theme.palette.background.yellow,
  },
}))
