import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },

  tooltipWrapperMargin: {
    marginRight: '-15px',
  },

  downloadLink: {
    fontSize: 14,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImgButton: {
    minWidth: 'unset !important',
    backgroundColor: 'inherit',
    padding: 0,
    margin: 0,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}))
