import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  columnMenuWrapper: {
    display: 'flex',
    width: '300px',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 20px 20px 20px',
    gap: '10px',
  },

  searchInput: {
    width: '100%',
    height: '30px',
  },

  filterTitle: {
    width: '100%',
    textAlign: 'left',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  filterFullTitle: {
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
  },

  filterWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
  },
}))
