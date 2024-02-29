import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const primaryMain = theme.palette.primary.main
  const backgroundGeneral = theme.palette.background.general

  const primaryHoverColor = theme.palette.button.primaryHoverColor
  const primaryDisabledColor = theme.palette.button.primaryDisabledColor

  return {
    buttonsWrapper: {
      padding: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },

    primaryButton: {
      color: backgroundGeneral,

      '> svg': {
        stroke: primaryMain,
        color: backgroundGeneral,
      },

      '&:hover': {
        '> svg': {
          color: backgroundGeneral,
          stroke: primaryHoverColor,
        },
      },

      '&:disabled': {
        '> svg': {
          color: backgroundGeneral,
          stroke: primaryDisabledColor,
        },
      },
    },
  }
})
