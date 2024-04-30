import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    button: {
      height: 32,
      whiteSpace: 'nowrap',
    },
  },

  imagesCount: {
    marginTop: 5,
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  imagesCountSpan: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginRight: 5,
  },
}))
