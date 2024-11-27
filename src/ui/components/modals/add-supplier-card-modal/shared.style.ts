import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  field: {
    margin: 0,
  },

  contactField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    width: 'calc(100% / 4)',

    '.icon': {
      display: 'none',
    },

    '&:hover': {
      '.icon': {
        display: 'block',
      },
    },
  },

  input: {
    width: 'unset',
    flex: 1,
  },

  selectOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  divider: {
    height: '100%',
  },

  sectionWrapper: {
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: theme?.palette?.background?.general,
    boxShadow: theme?.palette?.boxShadow?.paper,
  },

  uploadFilesInputWrapper: {
    marginTop: '0px',
    gap: '10px',
  },
}))
