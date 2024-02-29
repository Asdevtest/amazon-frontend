import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    gap: 30,
  },

  textFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,

    '> div': {
      margin: 0,
    },
  },

  textField: {
    width: 410,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid #E0E0E0',
    borderRadius: 4,
  },

  label: {
    maxWidth: 410,
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  tableContainer: {
    height: 523,
  },

  tableTitle: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  tableWrapper: {
    height: 'calc(100% - 29px)',
    width: 700,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  columnHeaderTitleContainer: {
    padding: '0 !important',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  buttonContent: {
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  saveIcon: {
    color: theme.palette.primary.main,
  },

  saveText: {
    color: theme.palette.primary.main,
  },

  editIcon: {
    color: theme.palette.text.second,
  },

  archiveIcon: {
    color: theme.palette.text.red,
  },
}))
