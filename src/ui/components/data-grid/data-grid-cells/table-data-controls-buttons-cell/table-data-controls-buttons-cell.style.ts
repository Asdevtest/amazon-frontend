import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const primaryMain = theme.palette.primary.main
  const redMain = theme.palette.text.red
  const backgroundGeneral = theme.palette.background.general

  const outlineEditHoverColor = theme.palette.button.outlineEditHoverColor
  const outlineEditHoverBackground = theme.palette.button.outlineEditHoverBackground
  const outlineEditBoxShadow = theme.palette.button.outlineEditBoxShadow
  const outlineEditDisabled = theme.palette.button.outlineEditDisabledColor

  const crossHoverColor = theme.palette.button.deleteHoverColor
  const crossHoverBackground = theme.palette.button.deleteHoverBackground
  const crossDisabledColor = theme.palette.button.deleteDisabledColor

  return {
    buttonsWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'center',
    },

    button: {
      borderRadius: '100%',
      width: '28px',
      height: '28px',
      padding: 0,
    },

    editButton: {
      border: `1px solid ${primaryMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: outlineEditBoxShadow,

      '> svg': {
        stroke: primaryMain,
        width: '13px',
        height: '13px',
      },

      '&:hover': {
        border: `1px solid ${outlineEditHoverColor}`,
        backgroundColor: outlineEditHoverBackground,
        boxShadow: outlineEditBoxShadow,

        '> svg': {
          stroke: outlineEditHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${outlineEditDisabled}`,
        backgroundColor: backgroundGeneral,
        boxShadow: outlineEditBoxShadow,

        '> svg': {
          stroke: outlineEditDisabled,
        },
      },
    },

    removeButton: {
      border: `1px solid ${redMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: outlineEditBoxShadow,

      '> svg': {
        color: redMain,
        width: '11px',
        height: '11px',
      },

      '&:hover': {
        border: `1px solid ${crossHoverColor}`,
        backgroundColor: crossHoverBackground,
        boxShadow: outlineEditBoxShadow,

        '> svg': {
          color: crossHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${crossDisabledColor}`,
        backgroundColor: backgroundGeneral,
        boxShadow: outlineEditBoxShadow,

        '> svg': {
          color: crossDisabledColor,
        },
      },
    },
  }
})
