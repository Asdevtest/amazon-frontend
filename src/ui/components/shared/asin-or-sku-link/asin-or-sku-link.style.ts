/* eslint-disable no-unused-vars */
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
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
  },

  asinValueText: {
    color: theme.palette.primary.main,
  },

  skuValueText: {
    color: '#AEAEAE',
  },

  attributeTitle: {
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  missingValueText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.text.second,
  },
}))
