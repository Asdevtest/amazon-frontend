import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '900px',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '.ant-form-item-control-input-content': {
      display: 'flex',
      alignItems: 'center',
    },
  },

  title: {
    fontWeight: 600,
  },

  footerWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    gap: '10px',
  },

  icon: {
    color: '#FFC53D',
  },

  markAsTop: {
    display: 'flex',
    alignItems: 'center',
  },

  contentWrapper: {
    display: 'flex',
    flex: 1,
    maxHeight: '65vh',
    flexDirection: 'column',
    gap: 10,
    overflow: 'auto',
  },
}))
