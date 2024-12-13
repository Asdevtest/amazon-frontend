import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: 30,
    width: 840,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  announcementTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },
  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  requestTypeContainer: {
    width: '280px !important',
    margin: '0 !important',
  },
  requestTypeField: {
    width: '100%',
    height: 40,
    margin: 0,
    paddingLeft: 10,

    borderRadius: 4,

    '&:before': {
      borderBottom: 'none',
    },
  },
  nameFieldContainer: {
    width: '450px !important',
    margin: '0 !important',
  },
  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },
  labelClass: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },
  descriptionField: {
    height: 100,
    width: '100%',
    overflowY: 'hidden',
  },
  descriptionContainer: {
    margin: '0 !important',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
