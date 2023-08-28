/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  sourceProductWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  sourceProductImg: {
    height: '40px',
    width: '40px',
    objectFit: 'contain',
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
  },

  sourceProductTitle: {
    whiteSpace: 'pre-wrap',
    width: 'min-content',
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  attributesProductWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}))
