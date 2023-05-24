import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
    display: 'flex',
  },

  groupText: {
    marginLeft: 5,
  },

  groupTitle: {
    fontWeight: 600,
    margin: '0 5px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: 200,
  },

  usersWrapper: {
    display: 'flex',
    gap: 5,
    maxWidth: 350,
    flexWrap: 'wrap',
  },
}))
