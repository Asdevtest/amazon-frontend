/* eslint-disable no-unused-vars */
export const styles = theme => ({
  isFormedWrapper: {
    padding: '10px 20px',
  },

  isFormedSubWrapper: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
  },

  shopsDataWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: 300,
    maxHeight: 340,

    padding: '7px 0',

    gap: 10,
  },
  searchInputWrapper: {
    width: 255,
    height: 30,
  },
  searchInput: {
    border: '1px solid #E0E0E0',
    width: '100%',
    height: '100%',
  },
  shopsBody: {
    width: 255,
    maxHeight: 245,
    overflowY: 'auto',

    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  },
  shop: {
    display: 'flex',
    alignItems: 'center',
  },
  shopName: {
    width: '100%',

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  orderStatusDataWrapper: {
    display: 'flex',
    padding: '7px 0 7px 7px',
  },
  orderStatusDataBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    width: 225,
    maxHeight: 420,
    overflowY: 'auto',
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    cursor: 'pointer',
  },
  orderStatusName: {
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
})
