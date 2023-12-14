import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    backgroundColor: `${theme.palette.background.general} !important`,

    'div .ril__imageNext': {
      display: 'none',
    },

    'div .ril__imagePrev': {
      display: 'none',
    },

    'div:last-child': {
      backgroundColor: 'transparent',

      ul: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,

        li: {
          button: {
            height: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',

            '&:hover': {
              opacity: 1,
              transform: 'scale(1.05)',
            },
          },
        },
      },
    },
  },

  videoPlayerCustomWrapper: {
    position: 'relative',
    zIndex: 5,
    maxWidth: 1200,
  },

  videoPlayerCustom: {
    video: {
      maxHeight: '700px !important',
    },
  },
}))
