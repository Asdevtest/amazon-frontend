import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
  },

  icon: {
    width: '24px !important',
    height: '24px !important',
  },

  variationIcon: {
    color: theme.palette.text.second,
  },

  parentVariationIcon: {
    color: `${theme.palette.primary.main} !important`,
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
  },

  removeIcon: {
    width: '11px !important',
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },

  removeButton: {
    backgroundColor: theme.palette.text.red,
    padding: '0 !important',
    height: '24px !important',
    width: '24px !important',
  },

  sourceProductWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '210px',
  },
}))
