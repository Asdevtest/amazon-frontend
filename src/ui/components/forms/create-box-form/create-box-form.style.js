import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '1060px',
    gap: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  subTitle: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.second,
  },

  field: {
    flexBasis: '100%',
  },

  divider: {
    width: '100%',
    height: 1,
    background: '#E0E0E0',
  },

  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '20px',
  },

  input: {
    width: 160,
  },

  numberInputFieldsBlocksSubWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },

  numberInputFieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  blockOfNewBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  labelFieldsWrapper: {
    display: 'flex',
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },

  hidden: {
    display: 'none',
  },
  checkboxLabel: {
    margin: 0,
    fontSize: '14px',
  },

  checkboxLabelContainer: {
    margin: 0,
    width: 'max-content',
  },

  destinationWrapper: {
    maxWidth: '400px',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    margin: 0,
  },
}))
