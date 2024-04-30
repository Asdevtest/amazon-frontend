import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 1130,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  headerLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.main,
  },

  textMargin: {
    marginBottom: 20,
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  simpleSpan: {
    fontWeight: '600 !important',
    fontSize: 14,
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    gap: 10,
  },

  containerField: {
    width: '160px !important',
    marginBottom: '0 !important',
  },

  field: {
    marginBottom: '0 !important',
    width: 'max-content',
  },

  fieldRemarks: {
    marginBottom: '0 !important',
    width: '100%',
  },

  linkInput: {
    width: 350,
  },

  button: {
    padding: '0 15px',
    whiteSpace: 'nowrap',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  downloadsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
  },

  downloadsCheckWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: '.3s ease',
    cursor: 'pointer',

    p: { width: 'max-content' },
  },

  bodyWrapper: {
    minHeight: 225,
    maxHeight: 480,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
    marginTop: 20,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  headerRightSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  viewLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  clientComment: {
    fontSize: 18,
    color: '#DF0C0C',
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },
}))
