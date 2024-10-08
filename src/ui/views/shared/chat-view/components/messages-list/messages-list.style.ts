import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  autoSizer: {
    '& > *:nth-child(1)': {
      paddingRight: '4px',

      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '4px',
        background: 'transparent',
        display: 'none',
      },

      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },

      '&:hover': {
        paddingRight: '4px',

        '::-webkit-scrollbar': {
          display: 'block',
        },
      },
    },
  },
}))
