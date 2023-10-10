import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },

  normalizeLink: {
    textDecoration: 'none',
    transition: '.3s ease',

    '&:hover': {
      opacity: '.7',
    },
  },

  valueText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  asinValueText: {
    color: theme.palette.primary.main,
  },

  attributeTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
}))
