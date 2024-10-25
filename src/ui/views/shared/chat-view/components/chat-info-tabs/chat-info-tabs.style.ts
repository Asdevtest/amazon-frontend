import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  infoWrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    overflowY: 'scroll',
    paddingRight: '5px',
    scrollbarGutter: 'stable',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '1px',
      '::-webkit-scrollbar': {
        display: 'block',
      },
    },
  },
}))
