import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  wrapperAlignLeft: {
    justifyContent: 'flex-start',
  },

  wrapperAlignRight: {
    justifyContent: 'flex-end',
  },

  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  smallGap: {
    gap: 0,
  },

  bigGap: {
    gap: 40,
  },

  quantitySlides: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },

  smallText: {
    fontSize: '12px !important',
    lineHeight: '16px !important',
  },

  mediumText: {
    fontSize: '16px !important',
    lineHeight: '22px !important',
  },

  bigText: {
    fontSize: '18px !important',
    lineHeight: '25px !important',
  },
}))
