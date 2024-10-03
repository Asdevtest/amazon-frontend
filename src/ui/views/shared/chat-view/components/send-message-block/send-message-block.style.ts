import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  sendMessageBlock: {
    display: 'flex',
    flexDirection: 'column',

    boxShadow: '0px -2.18px 4.36px rgba(97, 97, 97, 0.18)',
  },

  filesLoaderWrapper: {
    display: 'flex',
    padding: '10px',
  },

  messageBlock: {
    display: 'flex',
    padding: '10px',
    gap: '5px',
  },

  messageTextarea: {
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))
