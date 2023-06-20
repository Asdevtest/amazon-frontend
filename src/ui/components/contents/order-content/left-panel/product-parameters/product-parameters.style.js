import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  parameterTableCellWrapper: {
    display: 'flex',
    width: '436px',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  amountInput: {
    textAlign: 'center',
    width: 150,
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '14px',
    borderRadius: '4px',
    height: '36px',
  },
  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },

  text: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    textAlign: 'right',
  },

  scrollingText: {
    color: 'linear-gradient(180deg, #006CFF 0%, #0460DE 100%)',
    maxWidth: '270px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    fontSize: '16px',
    // lineHeight: '19px',
  },

  standartText: {
    color: theme.palette.text.second,
  },

  fieldLabel: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
  },

  sizesWrapper: {
    width: '255px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barCodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
}))
