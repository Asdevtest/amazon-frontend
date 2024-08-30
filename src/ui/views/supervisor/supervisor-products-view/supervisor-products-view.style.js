import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  attentionRow: {
    position: 'relative',
    background: theme.palette.background.yellowRow,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,
      width: 5,
      height: '98%',
      background: '#C69109',
    },
  },

  optionRender: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },

  optionRenderLabel: {
    flex: 'auto',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  optionRenderBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    padding: '2px 6px',
    fontSize: '12px',
    lineHeight: '12px',
    borderRadius: 6,
    color: '#fff',
  },
}))
