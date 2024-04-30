import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
  },

  variationIcon: {
    color: theme.palette.text.second,
  },

  parentVariationIcon: {
    color: `${theme.palette.primary.main} !important`,
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px',

    svg: {
      width: '12px !important',
      height: '12px !important',

      path: {
        stroke: 'currentcolor',
      },
    },
  },

  sourceProductWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '210px',
  },
}))
