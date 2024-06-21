import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  abbreviatedBatchProductsWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },

  abbreviatedWrapperDivider: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRight: 'none',
    borderLeft: 'none',
  },

  abbreviatedBatchProductsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  amountBoxesText: {
    width: 34,
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
  },

  abbreviatedBatchProductInfoMainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  abbreviatedBatchProductInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  abbreviatedImg: {
    width: 28,
    height: 28,
  },

  div: {
    display: 'flex',
    width: 104,
    marginRight: 15,
  },

  abbreviatedTitle: {
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  productInfoText: {
    fontSize: 13,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    width: 'fit-content',
  },
}))
