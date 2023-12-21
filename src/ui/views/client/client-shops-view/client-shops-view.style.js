import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  viewWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  buttonBox: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  shopsSelect: {
    marginLeft: 'auto',
  },

  filterBtn: {
    marginBottom: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    height: 'auto !important',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  fieldNamesWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'max-content',
    justifyContent: 'space-between',
    width: '100%',
  },

  fieldNamesWrapperWithCheckbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  fieldName: {
    height: 20,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.palette.text.general,
  },

  tabledWrapper: {
    marginTop: 20,
    height: 'calc(100vh - 240px)',
    width: '100%',
  },
}))
