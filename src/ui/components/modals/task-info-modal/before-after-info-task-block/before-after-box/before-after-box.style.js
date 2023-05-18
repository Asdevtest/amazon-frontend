import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  itemsWrapper: {
    marginTop: '5px',
  },

  chipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '5px',
  },
  categoryTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '5px',
    marginTop: '10px',
    height: '220px',
  },

  bottomBlockWrapper: {
    marginTop: '5px',
    padding: '10px',
  },

  boxInfoWrapper: {
    marginTop: '5px',
    padding: '10px',

    display: 'flex',
  },

  superWrapper: {
    display: 'flex',
    gap: '5px',
  },

  shippingLabelField: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  fieldsWrapper: {
    padding: '0 10px',
  },
  box: {
    width: '700px',
    border: '2px solid rgba(61, 81, 112, 0.3)',
    borderRadius: '10px',
  },

  imagesWrapper: {
    display: 'flex',
    padding: '5px',
    flexDirection: 'column',
  },

  photoWrapper: {
    width: '200px',
    marginLeft: '20px',
    minHeight: '150px',
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5px',
  },
}))
