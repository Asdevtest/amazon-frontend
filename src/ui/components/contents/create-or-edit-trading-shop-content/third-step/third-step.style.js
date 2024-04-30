import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  checkboxWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  spanLabelSmall: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.general,
  },

  step: {
    backgroundColor: '#00B746',
    height: '2px',
  },

  assetsPaper: {
    padding: '20px 15px',
    height: 190,
    overflow: 'auto',
    maxWidth: 500,
    // width: '100%'
  },

  selectedAssetWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px 0 8px',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  assetInputWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px 0 0',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  assetInput: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%',
    border: 'none',
    margin: 0,
  },

  selectedAsset: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%',

    color: theme.palette.text.general,
  },

  actionDelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  disabledActionButton: {
    cursor: 'auto',
    opacity: 0.5,
    '&:hover': {
      transform: 'none',
    },
  },

  infosWrapper: {
    width: '100%',
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
  },

  infosWrapperMarginTop: {
    marginTop: 30,
  },
}))
