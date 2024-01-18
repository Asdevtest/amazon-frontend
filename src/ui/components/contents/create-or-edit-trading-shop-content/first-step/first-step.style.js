import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainSubRightWrapper: {
    display: 'flex',

    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  title: {
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
  },

  middleWrapper: {
    width: '50%',
  },

  rightWrapper: {
    width: '50%',
    marginLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  descriptionFieldWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },

  descriptionField: {
    height: '255px',
    width: '100%',
    // overflowY: 'scroll',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  nameFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    '& > span': {
      marginTop: '-20px',
    },
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  spanLabelSmall: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.general,
  },

  dateAndTimeWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    // alignItems: 'center',
  },

  assetsAndFilesWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    // alignItems: 'center',
  },

  error: {
    color: 'red',
  },

  step: {
    backgroundColor: '#00B746',
    height: '2px',
  },

  assetsPaper: {
    padding: '20px 15px',
    height: 220,
    overflow: 'auto',
  },

  selectedRoleWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  assetInputWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px 0 0',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  assetInput: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 280,
    border: 'none',
    margin: 0,
  },

  selectedRole: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '280px',

    color: theme.palette.text.general,
  },

  actionDelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  disabledActionButton: {
    cursor: 'auto',
    opacity: 0.5,
    '&:hover': {
      transform: 'none',
    },
  },

  charactersHints: {
    color: theme.palette.text.second,
  },
}))
