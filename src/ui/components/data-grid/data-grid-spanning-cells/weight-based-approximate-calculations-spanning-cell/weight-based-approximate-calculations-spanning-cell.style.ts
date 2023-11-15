import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  destinationVariationsWrapper: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    border: `1px solid ${theme.palette.input.customBorder}`,
    borderBottom: 'none',
    borderTop: 'none',
  },

  destinationVariationWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0',
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },

  noBorder: {
    border: 'none !important',
  },

  destinationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  destinationVariation: {
    width: 119,
    display: 'flex',
    justifyContent: 'center',
  },

  destinationVariationText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',

    width: 'fit-content',
  },

  alignCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  variantWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 5,
  },
}))
