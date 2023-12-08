import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: 309,
    overflowY: 'auto',
    borderTop: `1px solid #E0E0E0`,
  },

  product: {
    padding: '12px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 30,
    borderBottom: `1px solid #E0E0E0`,
  },

  photosWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  descriptionWrapper: {
    width: 275,
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  parametersWrapper: {
    padding: '10px 5px 10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: '1 1 auto',
  },

  parameters: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  field: {
    width: '130px !important',
    margin: '0 !important',
  },

  input: {
    height: 40,
    borderRadius: 7,
  },

  label: {
    marginBottom: 5,
  },

  button: {
    padding: '0 20px',
  },

  iconContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  barcodeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  checkbox: {
    padding: 0,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  bigText: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  blueColor: {
    padding: '10px 0',
    color: theme.palette.primary.main,
  },
}))
