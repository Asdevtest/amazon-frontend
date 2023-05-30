import { makeStyles } from 'tss-react/mui'

export const useSupplierPriceVariationSelectorStyles = makeStyles()(theme => ({
  body: {
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    gap: 80,
    alignItems: 'flex-start',
  },
  creationBlock: {
    width: 'max-content',
    display: 'flex',
    gap: 20,
    alignItems: 'flex-end',
  },
  creationInput: {
    maxWidth: 100,
  },
  title: {
    color: theme.palette.text.general,
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 14,
  },
  label: {
    color: theme.palette.text.second,
    fontSize: 14,
    marginBottom: 8,
  },
  field: {
    marginBottom: 'unset',
  },
  currentVariations: {},
  currentVariationList: {
    display: 'grid',
    gap: 25,
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(3, 125px)',
  },
  variationListItem: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    right: '10px',
    margin: 'auto',
    top: '0',
    bottom: '0',
  },
  addBtn: {
    marginBottom: 7,
  },
  controlButton: {
    cursor: 'pointer',
    border: 'none',
    padding: 'unset',
    width: '18px',
    minWidth: '18px',
    height: '18px',
    fontSize: '14px',
    color: '#FFF',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:disabled': {
      cursor: 'unset',
      opacity: '.65',
    },
  },
}))
