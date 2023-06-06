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
    border: 'none',
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
    width: 170,
  },

  rateWrapper: {
    width: 58,
  },
})
