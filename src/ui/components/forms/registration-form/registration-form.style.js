import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {},
    formFields: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    field: {
      flexBasis: '100%',
      position: 'relative',
    },
    checkbox: {
      marginLeft: '-12px',
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(2.5),
    },

    visibilityIcon: {
      position: 'absolute',
      right: 10,
      top: 35,
      cursor: 'pointer',
    },

    inputAdornment: {
      position: 'absolute',
      left: 0,
    },

    validationMessage: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      marginTop: '-20px',

      // border: '1px solid #e0e0e0',
      // borderRadius: '4px',

      justifyContent: 'start',
      gap: '5px',
    },

    validationTitle: {
      fontSize: '14px',
      color: '#656565',
    },

    validationText: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      color: '#656565',
    },

    validationHiddenMessage: {
      display: 'flex',
      justifyContent: 'end',
    },

    validationHiddenText: {
      visibility: 'hidden',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      color: '#656565',
    },
  })
