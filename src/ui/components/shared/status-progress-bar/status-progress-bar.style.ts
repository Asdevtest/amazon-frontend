import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  information: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  status: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    maxWidth: 280,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  percent: {
    fontSize: 16,
    lineHeight: '22px',
  },

  progressBar: {
    display: 'flex',
    alignItems: 'center',
  },

  circle: {
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #d1d5db',
    borderRadius: '50%',
  },

  icon: {
    height: '14px !important',
    width: '14px !important',
  },

  point: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },

  line: {
    flexGrow: 1,
    height: 1,
    background: '#d1d5db',
  },
}))
