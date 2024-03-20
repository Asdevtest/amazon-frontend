import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  body: {
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  creationBlock: {
    width: 'max-content',
    display: 'flex',
    gap: 20,
    alignItems: 'flex-end',
    maxWidth: 368,
  },
  creationInput: {
    // maxWidth: 100,
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
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    maxHeight: 232,
    overflowY: 'auto',
    maxWidth: 388,
    justifySelf: 'flex-end',
  },
  variationListItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  removeBtn: {
    alignSelf: 'flex-end',
    marginBottom: '7px',
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
