import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '1140px',
    padding: 10,
  },
  form: {
    flexWrap: 'wrap',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: '10px',
    marginRight: 10,
  },

  subTitle: {
    color: theme.palette.text.second,
  },
  field: {
    flexBasis: '100%',
  },

  divider: {
    width: '100%',
    height: 1,
    background: '#E0E0E0',
    marginBottom: 20,
  },

  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    gap: '10px',
  },

  numberInputFieldsBlocksSubWrapper: {
    display: 'flex',
    justifyContent: 'center',
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

  sizesSubWrapper: {
    width: 'fit-content',
    marginBottom: 20,
  },
}))
