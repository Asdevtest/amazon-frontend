/* eslint-disable no-unused-vars */
export const styles = theme => ({
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

    // border: `1px solid ${theme.palette.input.customBorder}`,
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
    // borderTop: 'none',
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

  weightWrapper: {
    // minWight: 170,
    // maxWidth: 200,
    width: 145,
  },

  rateWrapper: {
    width: 58,
  },

  checkboxRoot: {
    width: '17px !important',
    height: '17px !important',
    borderRadius: 4,
  },

  variantWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 5,
  },

  alignCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
