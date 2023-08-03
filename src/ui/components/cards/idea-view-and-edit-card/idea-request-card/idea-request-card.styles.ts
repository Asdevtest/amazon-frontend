import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'space-between',
    height: '100%',
  },

  categoryTitle: {
    width: 'max-content',
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  categoryText: {
    color: theme.palette.text.general,
  },

  categoresWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  resultWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  resultButton: {
    width: '100%',
    height: '30px',
    whiteSpace: 'nowrap',
  },

  linkStyles: {
    color: theme.palette.primary.main,
  },

  draftStatus: {
    color: `${theme.palette.primary.main} !important`,
  },
}))
