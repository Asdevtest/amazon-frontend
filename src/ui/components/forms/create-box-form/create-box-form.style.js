import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '1140px',
    gap: 20,
    padding: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
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
    gap: '10px',
  },

  numberInputFieldsBlocksSubWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
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
  iconBtn: {
    padding: 0,
    width: 36,
    height: 36,
    minWidth: 36,
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '200px',
  },

  hidden: {
    display: 'none',
  },
  checkboxLabel: {
    margin: 0,
    width: '120px',
  },

  checkboxLabelContainer: {
    margin: 0,
    maxWidth: '80px',
    marginRight: '50px',
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
