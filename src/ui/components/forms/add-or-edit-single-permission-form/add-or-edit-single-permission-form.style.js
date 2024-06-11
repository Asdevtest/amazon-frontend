import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 600,
    padding: 10,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  field: {
    margin: 0,
  },

  input: {
    fontSize: 14,
    lineHeight: '19px',
  },

  descriptionField: {
    height: '100%',
  },

  allowUrls: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxHeight: 200,
    overflowY: 'auto',
  },

  urlInputWrapper: {
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  httpMethodSelect: {
    width: 115,
  },

  urlInput: {
    width: 370,
  },

  buttonContainer: {
    margin: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
    position: 'sticky',
    bottom: 0,
    paddingBlock: 5,
    backgroundColor: theme.palette.background.general,
  },
}))
