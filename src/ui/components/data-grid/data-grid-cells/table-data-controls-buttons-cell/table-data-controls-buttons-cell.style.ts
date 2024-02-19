import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const primaryMain = theme.palette.primary.main
  const redMain = theme.palette.text.red
  const successMain = theme.palette.text.green
  const backgroundGeneral = theme.palette.background.general

  const defaultBoxShadow = theme.palette.button.defaultBoxShadow
  const primaryHoverColor = theme.palette.button.primaryHoverColor
  const primaryHoverBackground = theme.palette.button.primaryHoverBackground
  const primaryDisabledColor = theme.palette.button.primaryDisabledColor

  const errorHoverColor = theme.palette.button.errorHoverColor
  const errorHoverBackground = theme.palette.button.errorHoverBackground
  const errorDisabledColor = theme.palette.button.errorDisabledColor

  const successHoverColor = theme.palette.button.successHoverColor
  const successHoverBackground = theme.palette.button.successHoverBackground
  const successDisabledColor = theme.palette.button.successDisabledColor

  return {
    buttonsWrapper: {
      padding: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },

    button: {
      borderRadius: '100%',
      width: '28px',
      height: '28px',
      padding: 0,
      backgroundColor: 'transparent !important',
    },

    primaryButton: {
      border: `1px solid ${primaryMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        stroke: primaryMain,
        width: '13px',
        height: '13px',
      },

      '&:hover': {
        border: `1px solid ${primaryHoverColor}`,
        backgroundColor: primaryHoverBackground,

        '> svg': {
          stroke: primaryHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${primaryDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          stroke: primaryDisabledColor,
        },
      },
    },

    errorButton: {
      border: `1px solid ${redMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        color: redMain,
        width: '11px',
        height: '11px',
      },

      '&:hover': {
        border: `1px solid ${errorHoverColor}`,
        backgroundColor: errorHoverBackground,

        '> svg': {
          color: errorHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${errorDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          color: errorDisabledColor,
        },
      },
    },

    successButton: {
      border: `1px solid ${successMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        color: successMain,
        width: '13px',
        height: '13px',
      },

      '&:hover': {
        border: `1px solid ${successHoverColor}`,
        backgroundColor: successHoverBackground,

        '> svg': {
          color: successHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${successDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          color: successDisabledColor,
        },
      },
    },
  }
})
